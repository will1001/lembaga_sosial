import { createHash } from 'node:crypto';

export default async function handler(req, res) {
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

  res.status(200).json({ ok: true });
}
