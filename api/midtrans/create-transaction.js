import { randomBytes } from 'node:crypto';
import { createClient } from '@sanity/client';

const MIDTRANS_API_BASE = process.env.MIDTRANS_API_BASE || 'https://app.sandbox.midtrans.com';
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'yhzk3e66';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const MAX_DONATION_AMOUNT = Number(process.env.MAX_DONATION_AMOUNT || 100000000);
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 12;
const rateLimitStore = new Map();

const paymentChannels = {
  gopay: { enabledPayments: ['gopay'], minAmount: 1000 },
  qris: { enabledPayments: ['gopay'], minAmount: 1000 },
  va_mandiri: { enabledPayments: ['echannel'], minAmount: 25000 },
  va_bsi: { enabledPayments: ['bsi_va'], minAmount: 25000 },
  va_bri: { enabledPayments: ['bri_va'], minAmount: 25000 },
  va_bca: { enabledPayments: ['bca_va'], minAmount: 25000 },
  va_bni: { enabledPayments: ['bni_va'], minAmount: 25000 },
  transfer_bca: { enabledPayments: ['bca_va'], minAmount: 25000 },
};

export default async function handler(req, res) {
  setCorsHeaders(req, res);
  setSecurityHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    if (isForbiddenOrigin(req)) {
      res.status(403).json({ error: 'Origin tidak diizinkan' });
      return;
    }

    if (isRateLimited(req)) {
      res.status(429).json({ error: 'Terlalu banyak percobaan. Coba lagi beberapa saat.' });
      return;
    }

    if (JSON.stringify(req.body || {}).length > 10000) {
      res.status(413).json({ error: 'Request terlalu besar' });
      return;
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const merchantId = process.env.MIDTRANS_MERCHANT_ID;
    const frontendUrl = process.env.FRONTEND_URL || `https://${req.headers.host}`;

    if (!serverKey || !merchantId) {
      res.status(500).json({ error: 'Midtrans sandbox credentials are not configured' });
      return;
    }

    const payload = await buildSnapPayload(req.body || {}, frontendUrl);
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
      redirectUrl: buildRedirectUrl(data.redirect_url, payload.custom_field3),
      merchantId,
    });
  } catch (error) {
    const statusCode = error instanceof ValidationError ? 400 : 500;
    res.status(statusCode).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}

async function buildSnapPayload(body, frontendUrl) {
  const amount = Number(body.amount);
  if (!Number.isInteger(amount) || amount < 1000 || amount > MAX_DONATION_AMOUNT) {
    throw new ValidationError('Nominal donasi tidak valid');
  }

  const paymentMethod = sanitizeText(body.paymentMethod || 'qris');
  const paymentConfig = paymentChannels[paymentMethod];
  if (!paymentConfig) {
    throw new ValidationError('Metode pembayaran tidak valid');
  }

  if (amount < paymentConfig.minAmount) {
    throw new ValidationError(`Minimal donasi untuk metode ini adalah Rp ${paymentConfig.minAmount.toLocaleString('id-ID')}`);
  }

  const programId = sanitizeSanityId(body.programId || '');
  if (!programId) {
    throw new ValidationError('Program donasi tidak valid');
  }

  const program = await getActiveDonationProgram(programId);
  if (!program) {
    throw new ValidationError('Program donasi tidak ditemukan atau tidak aktif');
  }

  const orderId = generateOrderId();
  const donorName = sanitizeText(body.donorName || 'Anonymous').slice(0, 120);
  const donorEmail = sanitizeText(body.donorEmail || '').slice(0, 254);
  const donorPhone = sanitizePhone(body.donorPhone || '');
  const programTitle = sanitizeText(program.title || 'Donasi Cahaya Untuk Negeri');

  if (!isValidEmail(donorEmail)) {
    throw new ValidationError('Email donatur tidak valid');
  }

  if (!isValidPhone(donorPhone)) {
    throw new ValidationError('Nomor telepon donatur tidak valid');
  }

  return {
    transaction_details: {
      order_id: orderId,
      gross_amount: Math.round(amount),
    },
    item_details: [
      {
        id: programId.slice(0, 50),
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
    custom_field1: programId,
    custom_field2: programTitle.slice(0, 255),
    custom_field3: paymentMethod,
    enabled_payments: paymentConfig.enabledPayments,
  };
}

function buildRedirectUrl(redirectUrl, paymentMethod) {
  if (paymentMethod !== 'qris' || !redirectUrl) {
    return redirectUrl;
  }

  const separator = redirectUrl.includes('?') ? '&' : '?';
  return `${redirectUrl}${separator}gopayMode=qr`;
}

async function getActiveDonationProgram(programId) {
  const client = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: '2023-12-01',
    useCdn: false,
  });

  return client.fetch(
    '*[_type == "donation" && _id == $programId && is_active == true][0]{_id,title}',
    { programId }
  );
}

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  const allowedOrigins = getAllowedOrigins(req);

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function isForbiddenOrigin(req) {
  const origin = req.headers.origin;
  return Boolean(origin && !getAllowedOrigins(req).has(origin));
}

function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cache-Control', 'no-store');
}

function getAllowedOrigins(req) {
  const frontendUrl = process.env.FRONTEND_URL;
  const hostUrl = req.headers.host ? `https://${req.headers.host}` : '';
  const origins = [frontendUrl, hostUrl, 'http://localhost:5173', 'http://127.0.0.1:5173']
    .filter(Boolean)
    .map((value) => {
      try {
        return new URL(value).origin;
      } catch {
        return '';
      }
    })
    .filter(Boolean);

  return new Set(origins);
}

function isRateLimited(req) {
  const key = getClientIp(req);
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function getClientIp(req) {
  return String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .split(',')[0]
    .trim();
}

function generateOrderId() {
  return `DON-${Date.now()}-${randomBytes(6).toString('hex')}`;
}

function sanitizeText(value) {
  return String(value).replace(/[\r\n\t]/g, ' ').trim();
}

function sanitizePhone(value) {
  return sanitizeText(value).replace(/[^\d+]/g, '').slice(0, 20);
}

function sanitizeSanityId(value) {
  return sanitizeText(value).replace(/[^A-Za-z0-9._-]/g, '').slice(0, 128);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  return /^\+?\d{8,15}$/.test(value);
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}
