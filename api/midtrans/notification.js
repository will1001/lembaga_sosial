import { createHash } from 'node:crypto';
import { createClient } from '@sanity/client';

const MIDTRANS_STATUS_API_BASE = process.env.MIDTRANS_STATUS_API_BASE || 'https://api.sandbox.midtrans.com';
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'yhzk3e66';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';

export default async function handler(req, res) {
  setSecurityHeaders(res);

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const notification = req.body || {};

  if (!serverKey || !notification.signature_key) {
    res.status(403).json({ ok: false });
    return;
  }

  const source = `${notification.order_id}${notification.status_code}${notification.gross_amount}${serverKey}`;
  const expected = createHash('sha512').update(source).digest('hex');
  const verified = expected === notification.signature_key;

  if (!verified) {
    res.status(403).json({ ok: false });
    return;
  }

  console.log('[midtrans] notification', {
    orderId: notification.order_id,
    status: notification.transaction_status,
    fraudStatus: notification.fraud_status,
    paymentType: notification.payment_type,
  });

  if (!isSuccessfulPayment(notification)) {
    res.status(200).json({ ok: true, donationUpdated: false });
    return;
  }

  try {
    const status = await fetchMidtransStatus(notification.order_id, serverKey);
    const verifiedTransaction = {
      ...notification,
      ...status,
    };

    if (!isSuccessfulPayment(verifiedTransaction)) {
      res.status(200).json({ ok: true, donationUpdated: false, reason: 'status_not_successful' });
      return;
    }

    const result = await recordSuccessfulDonation(verifiedTransaction);

    res.status(200).json({ ok: true, donationUpdated: result.updated, reason: result.reason });
  } catch (error) {
    console.error('[midtrans] donation update failed', {
      orderId: notification.order_id,
      error: error instanceof Error ? error.message : 'Unknown error',
      sanityAuth: getSanityAuthDebug(),
    });

    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to update donation total',
      sanityAuth: getSanityAuthDebug(),
    });
  }
}

function isSuccessfulPayment(notification) {
  const merchantId = process.env.MIDTRANS_MERCHANT_ID || '';
  const merchantMatches = !merchantId || !notification.merchant_id || notification.merchant_id === merchantId;
  const statusCodeOk = String(notification.status_code || '') === '200';
  const settled = notification.transaction_status === 'settlement';
  const captured = notification.transaction_status === 'capture' && notification.fraud_status === 'accept';

  return merchantMatches && statusCodeOk && (settled || captured);
}

async function fetchMidtransStatus(orderId, serverKey) {
  const response = await fetch(`${MIDTRANS_STATUS_API_BASE}/v2/${encodeURIComponent(orderId)}/status`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString('base64')}`,
      Accept: 'application/json',
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.status_message || `Failed to fetch Midtrans status: ${response.status}`);
  }

  return data;
}

async function recordSuccessfulDonation(transaction) {
  const token = getSanityToken();
  if (!token) {
    throw new Error('SANITY_AUTH_TOKEN is not configured');
  }

  const programId = sanitizeSanityId(transaction.custom_field1 || '');
  if (!programId) {
    throw new Error('Midtrans custom_field1 is missing donation program id');
  }

  const amount = Number(transaction.gross_amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Invalid donation amount from Midtrans');
  }

  const client = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: '2023-12-01',
    token,
    useCdn: false,
  });

  const program = await client.fetch('*[_type == "donation" && _id == $programId && is_active == true][0]._id', { programId });
  if (!program) {
    throw new Error(`Donation program not found or inactive in Sanity: ${programId}`);
  }

  const orderId = sanitizeSanityId(transaction.order_id);
  const recordId = `donation_record.${orderId}`;
  const record = {
    _id: recordId,
    _type: 'donation_record',
    donation_program: {
      _type: 'reference',
      _ref: programId,
    },
    donor_name: transaction.customer_details?.first_name || transaction.customer_name || 'Anonymous',
    donor_email: transaction.customer_details?.email || transaction.customer_email || 'donatur@example.com',
    donor_phone: transaction.customer_details?.phone || transaction.customer_phone || '',
    amount,
    message: '',
    payment_method: transaction.custom_field3 || transaction.payment_type || 'midtrans',
    payment_status: 'success',
    is_anonymous: false,
    created_at: transaction.settlement_time || transaction.transaction_time || new Date().toISOString(),
    midtrans_order_id: transaction.order_id,
    midtrans_transaction_id: transaction.transaction_id || '',
    midtrans_payment_type: transaction.payment_type || '',
  };

  try {
    await client
      .transaction()
      .create(record)
      .patch(programId, (patch) => patch.inc({ current_amount: amount, donors_count: 1 }))
      .commit();

    return { updated: true };
  } catch (error) {
    if (isDuplicateDocumentError(error)) {
      return { updated: false, reason: 'already_recorded' };
    }

    throw error;
  }
}

function isDuplicateDocumentError(error) {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes('Document already exists') || message.includes('already exists');
}

function getSanityToken() {
  const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN || '';
  return token.trim().replace(/^Bearer\s+/i, '').replace(/^["']|["']$/g, '');
}

function getSanityAuthDebug() {
  const rawToken = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN || '';
  const token = getSanityToken();

  return {
    hasToken: Boolean(rawToken),
    rawLength: rawToken.length,
    normalizedLength: token.length,
    prefix: token.slice(0, 4),
    hasBearerPrefix: /^Bearer\s+/i.test(rawToken.trim()),
    hasWrappingQuotes: /^["'].*["']$/.test(rawToken.trim()),
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
  };
}

function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cache-Control', 'no-store');
}

function sanitizeSanityId(value) {
  return String(value || '').replace(/[^A-Za-z0-9._-]/g, '-').slice(0, 128);
}
