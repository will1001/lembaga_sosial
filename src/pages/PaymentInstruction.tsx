import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Clock, Copy, Heart } from 'lucide-react';
import { findPaymentMethod } from '../data/paymentMethods';
import { getDonationTransaction, getPaymentInstruction } from '../utils/payment';

const PaymentInstruction: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
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

  const copyAccount = async () => {
    await navigator.clipboard.writeText(method.accountNumber);
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-white to-amber-50">
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-100 text-amber-700 p-3 rounded-full">
                  <Clock size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Instruksi Pembayaran</h1>
                  <p className="text-gray-600">Status transaksi: Menunggu Pembayaran</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-5 mb-6">
                <div className="text-sm text-gray-500 mb-1">{method.accountLabel}</div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-2xl font-bold text-gray-900 break-all">{method.accountNumber}</div>
                  <button
                    type="button"
                    onClick={copyAccount}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Copy size={16} />
                    Salin
                  </button>
                </div>
              </div>

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

              <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-bold text-amber-900 mb-2">Catatan untuk Midtrans</h3>
                <p className="text-amber-800 text-sm">
                  Jika transaksi dibuat dari sandbox Midtrans, gunakan tombol di bawah untuk membuka ulang halaman pembayaran.
                  Status final tetap perlu webhook backend agar tercatat otomatis.
                </p>
                {transaction.midtransRedirectUrl && (
                  <a
                    href={transaction.midtransRedirectUrl}
                    className="mt-4 inline-flex bg-amber-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-amber-700"
                  >
                    Buka Pembayaran Midtrans
                  </a>
                )}
              </div>
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
                Transaksi tercatat sebagai pending dan siap diproses oleh payment gateway.
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentInstruction;
