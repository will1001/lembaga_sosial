# Strapi + Midtrans Requirements

Repository ini belum berisi project Strapi. Dokumen ini menjelaskan bagian backend yang perlu dibuat agar checkout donasi Vite tersambung ke Midtrans secara production.

## Content Type

### donation-transaction

Field yang disarankan:

- `order_id` string, unique
- `program_id` string
- `program_title` string
- `donor_name` string
- `donor_email` email
- `donor_phone` string
- `amount` integer
- `message` text
- `payment_method` enumeration
- `payment_status` enumeration: `pending`, `success`, `failed`, `cancelled`, `expired`
- `midtrans_transaction_id` string
- `midtrans_payment_type` string
- `midtrans_va_number` string
- `midtrans_qr_url` string
- `snap_token` string
- `snap_redirect_url` string
- `paid_at` datetime

## Endpoint Publik

### `POST /api/donations/checkout`

Input:

```json
{
  "programId": "sanity-or-strapi-program-id",
  "programTitle": "Bantu Pendidikan",
  "amount": 25000,
  "donorName": "Nama Donatur",
  "donorEmail": "donatur@example.com",
  "donorPhone": "08123456789",
  "message": "Semoga bermanfaat",
  "paymentMethod": "qris"
}
```

Output:

```json
{
  "orderId": "DON-20260517-0001",
  "status": "pending",
  "paymentUrl": "https://app.sandbox.midtrans.com/snap/v2/vtweb/...",
  "snapToken": "midtrans-snap-token"
}
```

## Webhook Midtrans

### `POST /api/midtrans/webhook`

Tugas endpoint:

1. Validasi signature Midtrans.
2. Cari transaksi berdasarkan `order_id`.
3. Update status transaksi:
   - `settlement` / `capture` menjadi `success`
   - `pending` menjadi `pending`
   - `deny`, `cancel`, `expire` menjadi `failed` / `cancelled` / `expired`
4. Jika sukses, update total `current_amount` dan `donors_count` pada program donasi.

## Environment Variable

```env
MIDTRANS_IS_PRODUCTION=false
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxx
MIDTRANS_MERCHANT_ID=Gxxxxxxx
FRONTEND_URL=https://domain-anda.com
```

## Catatan Review Midtrans

Frontend Vite sekarang sudah punya:

- halaman program donasi
- form checkout
- pilihan metode pembayaran
- instruksi pembayaran
- syarat dan ketentuan
- kebijakan privasi
- kebijakan pengembalian dana
- kontak bisnis
- nominal Rupiah

Untuk production, data transaksi jangan hanya disimpan di browser. Pindahkan pembuatan transaksi ke Strapi endpoint `POST /api/donations/checkout`.
