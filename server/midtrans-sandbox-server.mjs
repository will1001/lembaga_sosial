import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@sanity/client';

const rootDir = process.cwd();
loadEnvFile(resolve(rootDir, '.env.local'));

const PORT = Number(process.env.MIDTRANS_DEV_SERVER_PORT || 8787);
const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || '';
const CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || '';
const MERCHANT_ID = process.env.MIDTRANS_MERCHANT_ID || '';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://127.0.0.1:5175';
const MIDTRANS_API_BASE = process.env.MIDTRANS_API_BASE || 'https://app.sandbox.midtrans.com';
const MIDTRANS_STATUS_API_BASE = process.env.MIDTRANS_STATUS_API_BASE || 'https://api.sandbox.midtrans.com';
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'yhzk3e66';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';

if (!SERVER_KEY || !CLIENT_KEY || !MERCHANT_ID) {
  console.warn('[midtrans] Missing sandbox credentials. Fill MIDTRANS_SERVER_KEY, MIDTRANS_CLIENT_KEY, and MIDTRANS_MERCHANT_ID in .env.local.');
}

const server = createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    const url = new URL(req.url || '/', `http://${req.headers.host}`);

    if (req.method === 'GET' && url.pathname === '/health') {
      sendJson(res, 200, {
        ok: true,
        merchantId: MERCHANT_ID,
        mode: 'sandbox',
      });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/midtrans/create-transaction') {
      const body = await readJson(req);
      const payload = buildSnapPayload(body);
      const response = await createSnapTransaction(payload);

      sendJson(res, 200, {
        orderId: payload.transaction_details.order_id,
        token: response.token,
        redirectUrl: response.redirect_url,
        merchantId: MERCHANT_ID,
        clientKey: CLIENT_KEY,
      });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/midtrans/notification') {
      const notification = await readJson(req);
      const verified = verifyMidtransSignature(notification);
      let donationUpdated = false;
      let updateReason = verified ? 'not_successful' : 'invalid_signature';

      if (verified && isSuccessfulPayment(notification)) {
        const status = await fetchMidtransStatus(notification.order_id);
        const result = await recordSuccessfulDonation({
          ...notification,
          ...status,
        });
        donationUpdated = result.updated;
        updateReason = result.reason || 'updated';
      }

      console.log('[midtrans] notification', {
        orderId: notification.order_id,
        status: notification.transaction_status,
        fraudStatus: notification.fraud_status,
        paymentType: notification.payment_type,
        verified,
        donationUpdated,
      });

      sendJson(res, verified ? 200 : 403, {
        ok: verified,
        donationUpdated,
        reason: updateReason,
      });
      return;
    }

    sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error('[midtrans] request failed', error);
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[midtrans] sandbox helper running at http://127.0.0.1:${PORT}`);
  console.log(`[midtrans] create transaction: http://127.0.0.1:${PORT}/api/midtrans/create-transaction`);
  console.log(`[midtrans] notification webhook: http://127.0.0.1:${PORT}/api/midtrans/notification`);
});

function buildSnapPayload(body) {
  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount < 1000) {
    throw new Error('Invalid donation amount');
  }

  const orderId = sanitizeOrderId(body.orderId || `DON-${Date.now()}`);
  const donorName = sanitizeText(body.donorName || 'Anonymous');
  const donorEmail = sanitizeText(body.donorEmail || 'donatur@example.com');
  const donorPhone = sanitizeText(body.donorPhone || '');
  const programTitle = sanitizeText(body.programTitle || 'Donasi Cahaya Untuk Negeri');
  const paymentMethod = sanitizeText(body.paymentMethod || 'qris');
  const enabledPayments = getEnabledPayments(paymentMethod);

  return {
    transaction_details: {
      order_id: orderId,
      gross_amount: Math.round(amount),
    },
    item_details: [
      {
        id: sanitizeText(body.programId || 'donation-program').slice(0, 50),
        price: Math.round(amount),
        quantity: 1,
        name: programTitle.slice(0, 50),
      },
    ],
    customer_details: {
      first_name: donorName.slice(0, 255),
      email: donorEmail,
      phone: donorPhone,
    },
    callbacks: {
      finish: `${FRONTEND_URL}/payment/${encodeURIComponent(orderId)}?status=finish`,
      error: `${FRONTEND_URL}/payment/${encodeURIComponent(orderId)}?status=error`,
      pending: `${FRONTEND_URL}/payment/${encodeURIComponent(orderId)}?status=pending`,
    },
    custom_field1: sanitizeText(body.programId || ''),
    custom_field2: programTitle.slice(0, 255),
    custom_field3: paymentMethod,
    enabled_payments: enabledPayments,
  };
}

function getEnabledPayments(paymentMethod) {
  const channels = {
    gopay: ['gopay'],
    qris: ['gopay'],
    va_mandiri: ['echannel'],
    va_bsi: ['bsi_va'],
    va_bri: ['bri_va'],
    va_bca: ['bca_va'],
    va_bni: ['bni_va'],
    transfer_bca: ['bca_va'],
  };

  return channels[paymentMethod] || channels.qris;
}

async function createSnapTransaction(payload) {
  if (!SERVER_KEY) {
    throw new Error('MIDTRANS_SERVER_KEY is not configured');
  }

  const response = await fetch(`${MIDTRANS_API_BASE}/snap/v1/transactions`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${SERVER_KEY}:`).toString('base64')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error_messages?.join(', ') || `Midtrans request failed with status ${response.status}`);
  }

  return data;
}

function verifyMidtransSignature(notification) {
  if (!SERVER_KEY || !notification?.signature_key) return false;

  const source = `${notification.order_id}${notification.status_code}${notification.gross_amount}${SERVER_KEY}`;
  const expected = createHash('sha512').update(source).digest('hex');
  return expected === notification.signature_key;
}

function isSuccessfulPayment(notification) {
  return ['settlement', 'capture'].includes(notification.transaction_status);
}

async function fetchMidtransStatus(orderId) {
  const response = await fetch(`${MIDTRANS_STATUS_API_BASE}/v2/${encodeURIComponent(orderId)}/status`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${SERVER_KEY}:`).toString('base64')}`,
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
  const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN;
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

  const program = await client.fetch('*[_type == "donation" && _id == $programId][0]._id', { programId });
  if (!program) {
    throw new Error(`Donation program not found in Sanity: ${programId}`);
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

function readJson(req) {
  return new Promise((resolveJson, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1024 * 1024) {
        req.destroy();
        reject(new Error('Request body is too large'));
      }
    });
    req.on('end', () => {
      try {
        resolveJson(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function loadEnvFile(path) {
  if (!existsSync(path)) return;

  const content = readFileSync(path, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const index = trimmed.indexOf('=');
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function sanitizeText(value) {
  return String(value).replace(/[\r\n\t]/g, ' ').trim();
}

function sanitizeOrderId(value) {
  return sanitizeText(value).replace(/[^A-Za-z0-9._~-]/g, '-').slice(0, 50);
}

function sanitizeSanityId(value) {
  return String(value || '').replace(/[^A-Za-z0-9._-]/g, '-').slice(0, 128);
}
