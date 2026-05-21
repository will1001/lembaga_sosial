import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Info, Minus, Plus, X } from 'lucide-react';
import { paymentGroups, paymentMethods } from '../data/paymentMethods';

interface DonationFormProps {
  programId: string;
  programTitle: string;
  onSubmit: (data: DonationSubmitData) => void | Promise<void>;
}

export interface DonationSubmitData {
  amount: number;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  message: string;
  paymentMethod: string;
  isAnonymous: boolean;
  programId: string;
  programTitle: string;
}

const DonationForm: React.FC<DonationFormProps> = ({ programId, programTitle, onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: '',
    customAmount: '',
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    message: '',
    paymentMethod: 'qris',
    isAnonymous: false,
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSheetOpen, setPaymentSheetOpen] = useState(false);
  const predefinedAmounts = [10000, 25000, 50000, 100000, 250000, 500000];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const selectedAmount = parseInt(formData.amount, 10) || parseInt(formData.customAmount, 10) || 0;
  const selectedMethod = paymentMethods.find((method) => method.id === formData.paymentMethod) ?? paymentMethods[0];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const selectedMethod = paymentMethods.find((method) => method.id === formData.paymentMethod);

    if (!selectedAmount) {
      newErrors.amount = 'Pilih jumlah donasi';
    } else if (selectedAmount < 1000) {
      newErrors.amount = 'Minimal donasi Rp 1.000';
    }

    if (selectedMethod && selectedAmount > 0 && selectedAmount < selectedMethod.minAmount) {
      newErrors.paymentMethod = `Minimal donasi untuk ${selectedMethod.name} adalah ${formatCurrency(selectedMethod.minAmount)}`;
    }

    if (!formData.isAnonymous && !formData.donorName.trim()) {
      newErrors.donorName = 'Nama diperlukan';
    }

    if (!formData.donorEmail.trim()) {
      newErrors.donorEmail = 'Email diperlukan';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.donorEmail)) {
      newErrors.donorEmail = 'Email tidak valid';
    }

    if (!formData.donorPhone.trim()) {
      newErrors.donorPhone = 'Nomor telepon diperlukan';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Anda harus menyetujui syarat dan ketentuan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        amount: selectedAmount,
        donorName: formData.isAnonymous ? 'Anonymous' : formData.donorName,
        donorEmail: formData.donorEmail,
        donorPhone: formData.donorPhone,
        message: formData.message,
        paymentMethod: formData.paymentMethod,
        isAnonymous: formData.isAnonymous,
        programId,
        programTitle,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleAmountSelect = (amount: number) => {
    setFormData((prev) => ({
      ...prev,
      amount: amount.toString(),
      customAmount: '',
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.amount;
      delete next.paymentMethod;
      return next;
    });
  };

  const handleMethodSelect = (methodId: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: methodId }));
    setPaymentSheetOpen(false);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.paymentMethod;
      return next;
    });
  };

  const adjustCustomAmount = (direction: 1 | -1) => {
    const baseAmount = selectedAmount || 1000;
    const nextAmount = Math.max(1000, baseAmount + direction * 1000);
    setFormData((prev) => ({
      ...prev,
      amount: '',
      customAmount: nextAmount.toString(),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Donasi untuk "{programTitle}"
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pilih Jumlah Donasi
          </label>
          <div className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
            <p className="text-xs font-medium text-gray-500">Nominal donasi</p>
            <p className="mt-1 text-2xl font-bold text-gray-950">{formatCurrency(selectedAmount)}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {predefinedAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handleAmountSelect(amount)}
                className={`py-3 px-4 rounded-lg border-2 text-center font-medium transition-colors ${
                  formData.amount === amount.toString()
                    ? 'border-amber-600 bg-amber-50 text-amber-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {formatCurrency(amount)}
              </button>
            ))}
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Atau masukkan jumlah lainnya
          </label>
          <div className="grid grid-cols-[1fr_50px_50px] gap-2">
            <input
              type="number"
              name="customAmount"
              value={formData.customAmount}
              onChange={(event) => {
                setFormData((prev) => ({ ...prev, customAmount: event.target.value, amount: '' }));
                handleInputChange(event);
              }}
              min="1000"
              placeholder="Masukkan jumlah donasi"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => adjustCustomAmount(-1)}
              className="flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              aria-label="Kurangi nominal"
            >
              <Minus size={18} />
            </button>
            <button
              type="button"
              onClick={() => adjustCustomAmount(1)}
              className="flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              aria-label="Tambah nominal"
            >
              <Plus size={18} />
            </button>
          </div>
          {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}
        </div>

        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-amber-600 focus:ring-amber-600"
            />
            <span className="text-sm text-gray-700">Donasi secara anonim</span>
          </label>

          {!formData.isAnonymous && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="donorName"
                value={formData.donorName}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
              {errors.donorName && <p className="text-red-600 text-sm mt-1">{errors.donorName}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="donorEmail"
              value={formData.donorEmail}
              onChange={handleInputChange}
              placeholder="Masukkan email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
            />
            {errors.donorEmail && <p className="text-red-600 text-sm mt-1">{errors.donorEmail}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Telepon
            </label>
            <input
              type="tel"
              name="donorPhone"
              value={formData.donorPhone}
              onChange={handleInputChange}
              placeholder="Masukkan no. telepon"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
            />
            {errors.donorPhone && <p className="text-red-600 text-sm mt-1">{errors.donorPhone}</p>}
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-orange-50 p-3 text-xs leading-relaxed text-orange-800">
            <Info size={16} className="mt-0.5 shrink-0" />
            Pastikan nomor WhatsApp aktif untuk menerima bukti pembayaran dan update penyaluran donasi.
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pesan (Opsional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
            placeholder="Tulis pesan atau doa Anda..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Metode Pembayaran
          </label>
          <button
            type="button"
            onClick={() => setPaymentSheetOpen(true)}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 text-left transition hover:border-amber-300 hover:bg-amber-50"
          >
            <span>
              <span className="block text-sm font-semibold text-gray-950">{selectedMethod.name}</span>
              <span className="mt-1 block text-xs text-gray-500">{selectedMethod.group}</span>
            </span>
            <ChevronRight size={18} className="text-gray-500" />
          </button>
          {errors.paymentMethod && <p className="text-red-600 text-sm mt-1">{errors.paymentMethod}</p>}
        </div>

        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-amber-600 focus:ring-amber-600 mt-1"
            />
            <span className="text-sm text-gray-700">
              Saya menyetujui{' '}
              <Link to="/syarat-ketentuan" className="text-amber-700 font-medium hover:text-amber-800">
                syarat dan ketentuan
              </Link>
              ,{' '}
              <Link to="/kebijakan-privasi" className="text-amber-700 font-medium hover:text-amber-800">
                kebijakan privasi
              </Link>
              , dan{' '}
              <Link to="/kebijakan-pengembalian-dana" className="text-amber-700 font-medium hover:text-amber-800">
                kebijakan pengembalian dana
              </Link>
              , dan memahami{' '}
              <Link to="/cara-berdonasi" className="text-amber-700 font-medium hover:text-amber-800">
                cara berdonasi
              </Link>
              .
            </span>
          </label>
          {errors.agreeTerms && <p className="text-red-600 text-sm mt-1">{errors.agreeTerms}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Memproses...' : 'Lanjutkan Pembayaran'}
        </button>
      </form>

      {paymentSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-0 sm:px-4">
          <div className="max-h-[86vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
            <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-4">
              <button
                type="button"
                onClick={() => setPaymentSheetOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                aria-label="Tutup metode pembayaran"
              >
                <X size={20} />
              </button>
              <h4 className="text-base font-bold text-gray-950">Pilih Metode Pembayaran</h4>
            </div>
            <div className="space-y-3 p-4">
              {paymentGroups.map((group) => (
                <div key={group.id} className="overflow-hidden rounded-xl border border-gray-200">
                  <div className="bg-gray-100 px-4 py-3 text-sm font-bold text-gray-600">
                    {group.title}
                  </div>
                  <div className="divide-y divide-gray-200">
                    {paymentMethods
                      .filter((method) => method.group === group.id)
                      .map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => handleMethodSelect(method.id)}
                          className={`flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition ${
                            formData.paymentMethod === method.id
                              ? 'bg-amber-50 text-amber-800'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>
                            <span className="block font-medium">{method.name}</span>
                            <span className="mt-1 block text-xs text-gray-500">
                              Minimal {formatCurrency(method.minAmount)}
                            </span>
                          </span>
                          <span
                            className={`h-4 w-4 rounded-full border ${
                              formData.paymentMethod === method.id
                                ? 'border-amber-600 bg-amber-600'
                                : 'border-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DonationForm;
