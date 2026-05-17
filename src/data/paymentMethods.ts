export type PaymentMethod = {
  id: string;
  name: string;
  group: 'E-Wallet' | 'Virtual Account' | 'Bank Transfer';
  minAmount: number;
  accountLabel: string;
  accountNumber: string;
  instructions: string[];
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'gopay',
    name: 'GoPay',
    group: 'E-Wallet',
    minAmount: 1000,
    accountLabel: 'GoPay Merchant',
    accountNumber: 'Akan dibuat otomatis oleh payment gateway',
    instructions: [
      'Pilih GoPay pada halaman pembayaran.',
      'Ikuti instruksi pembayaran dari aplikasi GoPay.',
      'Status donasi akan diperbarui setelah pembayaran terverifikasi.',
    ],
  },
  {
    id: 'qris',
    name: 'QRIS',
    group: 'E-Wallet',
    minAmount: 1000,
    accountLabel: 'QRIS',
    accountNumber: 'QR code akan dibuat otomatis oleh payment gateway',
    instructions: [
      'Scan QRIS menggunakan aplikasi bank atau e-wallet.',
      'Pastikan nominal pembayaran sesuai dengan jumlah donasi.',
      'Simpan bukti pembayaran sampai status berhasil.',
    ],
  },
  {
    id: 'va_mandiri',
    name: 'VA Mandiri',
    group: 'Virtual Account',
    minAmount: 25000,
    accountLabel: 'Virtual Account Mandiri',
    accountNumber: '8808 0000 0000',
    instructions: [
      'Buka Livin Mandiri, ATM, atau internet banking Mandiri.',
      'Pilih pembayaran Virtual Account.',
      'Masukkan nomor VA dan selesaikan pembayaran.',
    ],
  },
  {
    id: 'va_bsi',
    name: 'VA BSI',
    group: 'Virtual Account',
    minAmount: 25000,
    accountLabel: 'Virtual Account BSI',
    accountNumber: '9000 0000 0000',
    instructions: [
      'Buka BSI Mobile, ATM, atau internet banking BSI.',
      'Pilih pembayaran Virtual Account.',
      'Masukkan nomor VA dan selesaikan pembayaran.',
    ],
  },
  {
    id: 'va_bri',
    name: 'VA BRI',
    group: 'Virtual Account',
    minAmount: 25000,
    accountLabel: 'BRIVA',
    accountNumber: '7777 0000 0000',
    instructions: [
      'Buka BRImo, ATM BRI, atau internet banking BRI.',
      'Pilih pembayaran BRIVA.',
      'Masukkan nomor BRIVA dan selesaikan pembayaran.',
    ],
  },
  {
    id: 'va_bca',
    name: 'VA BCA',
    group: 'Virtual Account',
    minAmount: 25000,
    accountLabel: 'Virtual Account BCA',
    accountNumber: '3901 0000 0000',
    instructions: [
      'Buka myBCA, BCA Mobile, KlikBCA, atau ATM BCA.',
      'Pilih pembayaran Virtual Account.',
      'Masukkan nomor VA dan selesaikan pembayaran.',
    ],
  },
  {
    id: 'va_bni',
    name: 'VA BNI',
    group: 'Virtual Account',
    minAmount: 25000,
    accountLabel: 'Virtual Account BNI',
    accountNumber: '8808 0000 0000',
    instructions: [
      'Buka BNI Mobile, ATM BNI, atau internet banking BNI.',
      'Pilih pembayaran Virtual Account Billing.',
      'Masukkan nomor VA dan selesaikan pembayaran.',
    ],
  },
  {
    id: 'transfer_bca',
    name: 'Transfer BCA',
    group: 'Bank Transfer',
    minAmount: 25000,
    accountLabel: 'Bank BCA a.n. Cahaya Untuk Negeri',
    accountNumber: '1234567890',
    instructions: [
      'Transfer sesuai nominal donasi ke rekening yang tertera.',
      'Gunakan ID transaksi pada berita transfer bila memungkinkan.',
      'Konfirmasi ke kontak resmi jika status belum berubah.',
    ],
  },
];

export const paymentGroups = [
  {
    id: 'E-Wallet',
    title: 'E-Wallet (verifikasi otomatis, minimal nominal Rp1.000)',
  },
  {
    id: 'Virtual Account',
    title: 'Virtual Account (verifikasi otomatis, minimal nominal Rp25.000)',
  },
  {
    id: 'Bank Transfer',
    title: 'Bank Transfer (verifikasi manual/otomatis, minimal nominal Rp25.000)',
  },
] as const;

export function findPaymentMethod(methodId: string): PaymentMethod {
  return paymentMethods.find((method) => method.id === methodId) ?? paymentMethods[0];
}
