import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { CheckCircle, Clock, ExternalLink, Heart, XCircle } from 'lucide-react';
import { findPaymentMethod } from '../data/paymentMethods';
import { getDonationTransaction, getPaymentInstruction } from '../utils/payment';

const PaymentInstruction: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams] = useSearchParams();
  const transaction = orderId ? getDonationTransaction(orderId) : undefined;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!transaction || !orderId) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-amber-50">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-lg mx-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Transaksi tidak ditemukan</h1>
          <p className="text-gray-600 mb-6">Silakan pilih program donasi dan ulangi proses pembayaran.</p>
          <Link to="/donasi" className="inline-flex bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700">
            Kembali ke Donasi
          </Link>
        </div>
      </div>
    );
  }

  const method = findPaymentMethod(transaction.paymentMethod);
  const instructions = getPaymentInstruction(orderId);
  const midtransStatus = searchParams.get('transaction_status');
  const callbackStatus = searchParams.get('status');
  const statusCode = searchParams.get('status_code');
  const isSuccess = midtransStatus === 'settlement' || midtransStatus === 'capture' || (callbackStatus === 'finish' && statusCode === '200');
  const isFailed = callbackStatus === 'error' || ['deny', 'cancel', 'expire', 'failure'].includes(midtransStatus || '');
  const statusLabel = isSuccess ? 'Berhasil' : isFailed ? 'Gagal' : 'Menunggu Pembayaran';
  const StatusIcon = isSuccess ? CheckCircle : isFailed ? XCircle : Clock;
  const statusIconClass = isSuccess
    ? 'bg-green-100 text-green-700'
    : isFailed
      ? 'bg-red-100 text-red-700'
      : 'bg-amber-100 text-amber-700';

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-white to-amber-50">
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`${statusIconClass} p-3 rounded-full`}>
                  <StatusIcon size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {isSuccess ? 'Donasi Berhasil' : isFailed ? 'Pembayaran Tidak Berhasil' : 'Instruksi Pembayaran'}
                  </h1>
                  <p className="text-gray-600">Status transaksi: {statusLabel}</p>
                </div>
              </div>

              {isSuccess ? (
                <div className="border border-green-200 bg-green-50 rounded-xl p-5 mb-6">
                  <h2 className="text-xl font-bold text-green-900 mb-2">Terima kasih, donasi Anda sudah terkonfirmasi.</h2>
                  <p className="text-green-800">
                    Pembayaran telah berhasil diproses oleh Midtrans. Simpan ID transaksi ini jika dibutuhkan untuk konfirmasi.
                  </p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-xl p-5 mb-6">
                  <div className="text-sm text-gray-500 mb-1">Metode pembayaran</div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{method.name}</div>
                      <p className="mt-1 text-sm text-gray-600">
                        Nomor VA atau QR resmi dibuat dan ditampilkan di halaman pembayaran Midtrans.
                      </p>
                    </div>
                    {transaction.midtransRedirectUrl && (
                      <a
                        href={transaction.midtransRedirectUrl}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700"
                      >
                        <ExternalLink size={16} />
                        Buka Midtrans
                      </a>
                    )}
                  </div>
                </div>
              )}

              {!isSuccess && !isFailed && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">Cara Pembayaran</h2>
                  <ol className="space-y-3">
                    {instructions.map((instruction, index) => (
                      <li key={instruction} className="flex gap-3 text-gray-700">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {!isSuccess && transaction.midtransRedirectUrl && (
                <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-bold text-amber-900 mb-2">Catatan untuk Midtrans</h3>
                <p className="text-amber-800 text-sm">
                  Gunakan tombol di bawah jika halaman pembayaran Midtrans tertutup sebelum pembayaran selesai.
                </p>
                <a
                  href={transaction.midtransRedirectUrl}
                  className="mt-4 inline-flex bg-amber-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-amber-700"
                >
                  Buka Pembayaran Midtrans
                </a>
                </div>
              )}
            </div>

            <aside className="bg-white rounded-xl shadow-lg p-6 h-fit">
              <div className="flex items-center gap-2 text-amber-700 font-bold mb-4">
                <Heart size={20} />
                Ringkasan Donasi
              </div>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-gray-500">ID Transaksi</dt>
                  <dd className="font-semibold text-gray-900 break-all">{transaction.orderId}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Program</dt>
                  <dd className="font-semibold text-gray-900">{transaction.programTitle}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Nominal</dt>
                  <dd className="text-2xl font-bold text-amber-700">{formatCurrency(transaction.amount)}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Metode</dt>
                  <dd className="font-semibold text-gray-900">{method.name}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Batas Pembayaran</dt>
                  <dd className="font-semibold text-gray-900">
                    {new Date(transaction.expiresAt).toLocaleString('id-ID')}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex items-start gap-2 text-sm text-green-700 bg-green-50 rounded-lg p-3">
                <CheckCircle size={18} className="mt-0.5 shrink-0" />
                {isSuccess
                  ? 'Transaksi berhasil diproses oleh payment gateway.'
                  : 'Transaksi tercatat dan siap diproses oleh payment gateway.'}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentInstruction;
