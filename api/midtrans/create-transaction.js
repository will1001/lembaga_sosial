const MIDTRANS_API_BASE = process.env.MIDTRANS_API_BASE || 'https://app.sandbox.midtrans.com';

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const clientKey = process.env.MIDTRANS_CLIENT_KEY;
    const merchantId = process.env.MIDTRANS_MERCHANT_ID;
    const frontendUrl = process.env.FRONTEND_URL || `https://${req.headers.host}`;

    if (!serverKey || !clientKey || !merchantId) {
      res.status(500).json({ error: 'Midtrans sandbox credentials are not configured' });
      return;
    }

    const payload = buildSnapPayload(req.body || {}, frontendUrl);
    const response = await fetch(`${MIDTRANS_API_BASE}/snap/v1/transactions`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${serverKey}:`).toString('base64')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      res.status(response.status).json({
        error: data.error_messages?.join(', ') || 'Midtrans request failed',
      });
      return;
    }

    res.status(200).json({
      orderId: payload.transaction_details.order_id,
      token: data.token,
      redirectUrl: data.redirect_url,
      merchantId,
      clientKey,
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}

function buildSnapPayload(body, frontendUrl) {
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
      finish: `${frontendUrl}/payment/${encodeURIComponent(orderId)}?status=finish`,
      error: `${frontendUrl}/payment/${encodeURIComponent(orderId)}?status=error`,
      pending: `${frontendUrl}/payment/${encodeURIComponent(orderId)}?status=pending`,
    },
    custom_field1: sanitizeText(body.programId || ''),
    custom_field2: programTitle.slice(0, 255),
    custom_field3: paymentMethod,
  };
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function sanitizeText(value) {
  return String(value).replace(/[\r\n\t]/g, ' ').trim();
}

function sanitizeOrderId(value) {
  return sanitizeText(value).replace(/[^A-Za-z0-9._~-]/g, '-').slice(0, 50);
}
