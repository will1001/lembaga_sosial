import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { client } from '../sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Copy,
  HandCoins,
  Share2,
  UserCircle,
  Users,
  X,
} from 'lucide-react';
import DonationForm, { DonationSubmitData } from '../components/DonationForm';
import { createDonationTransaction, createMidtransSnapTransaction, saveDonationTransaction } from '../utils/payment';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface DonationRecord {
  _id: string;
  donor_name: string;
  amount: number;
  message?: string;
  is_anonymous?: boolean;
  created_at?: string;
}

interface Donation {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  image: any;
  content: any;
  target_amount: number;
  current_amount: number;
  donors_count: number;
  category: string;
  is_active: boolean;
  featured: boolean;
  start_date?: string;
  end_date?: string;
  records?: DonationRecord[];
}

const DonationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showDescriptionFull, setShowDescriptionFull] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    const fetchDonation = async () => {
      if (!slug) return;

      try {
        const query = `*[_type == "donation" && slug.current == $slug && is_active == true][0] {
          _id,
          title,
          slug,
          description,
          image,
          content,
          target_amount,
          current_amount,
          donors_count,
          category,
          is_active,
          featured,
          start_date,
          end_date,
          "records": *[_type == "donation_record" && references(^._id) && payment_status == "success"] | order(created_at desc)[0...5] {
            _id,
            donor_name,
            amount,
            message,
            is_anonymous,
            created_at
          }
        }`;

        const result = await client.fetch(query, { slug });
        setDonation(result);
      } catch (error) {
        console.error('Error fetching donation:', error);
        navigate('/donasi');
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
  }, [slug, navigate]);

  const progressPercentage = (current: number, target: number) => {
    if (!target) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return Math.round(percentage);
  };

  const getDaysLeft = (endDate?: string) => {
    if (!endDate) return 'Terbuka';
    const today = new Date();
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} Hari lagi` : 'Berakhir';
  };

  const openDonationForm = () => {
    setShowForm(true);
    window.setTimeout(() => {
      document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleShare = async () => {
    if (!donation) return;

    const shareData = {
      title: donation.title,
      text: donation.description || 'Dukung program donasi Cahaya Untuk Negeri.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Keep custom share sheet available when native share is cancelled.
      }
    }

    setShareOpen(true);
  };

  const copyCurrentUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShareOpen(false);
  };

  const handleDonationSubmit = async (data: DonationSubmitData) => {
    const transaction = createDonationTransaction({
      programId: data.programId,
      programTitle: data.programTitle,
      amount: data.amount,
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      donorPhone: data.donorPhone,
      message: data.message,
      paymentMethod: data.paymentMethod,
    });

    try {
      const snap = await createMidtransSnapTransaction(transaction);
      const updatedTransaction = {
        ...transaction,
        midtransToken: snap.token,
        midtransRedirectUrl: snap.redirectUrl,
      };

      saveDonationTransaction(updatedTransaction);
      window.location.href = snap.redirectUrl;
    } catch (error) {
      console.error('Error creating Midtrans transaction:', error);
      const message = error instanceof Error ? error.message : 'Gagal membuat transaksi Midtrans';
      alert(`Transaksi Midtrans belum bisa dibuat: ${message}`);
      navigate(`/payment/${transaction.orderId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Program donasi tidak ditemukan</h2>
          <button
            onClick={() => navigate('/donasi')}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Kembali ke Daftar Program
          </button>
        </div>
      </div>
    );
  }

  const progress = progressPercentage(donation.current_amount, donation.target_amount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 pb-20 lg:pb-0">
      <div className="relative h-96">
        {donation.image && (
          <img
            src={urlFor(donation.image).width(1200).height(400).url()}
            alt={donation.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute left-4 top-24 z-10">
          <button
            type="button"
            onClick={() => navigate('/donasi')}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition hover:bg-amber-50"
            aria-label="Kembali"
          >
            <ArrowLeft size={22} />
          </button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{donation.title}</h1>
            <p className="text-xl md:text-2xl opacity-90">{donation.category.toUpperCase()}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-tr-2xl rounded-bl-2xl border border-amber-200 bg-amber-50 text-amber-700">
                    <Users size={21} />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{donation.donors_count}</div>
                  <div className="text-xs text-gray-600">Donatur</div>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-md border border-amber-200 bg-amber-50 text-amber-700">
                    <Clock size={21} />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{getDaysLeft(donation.end_date)}</div>
                  <div className="text-xs text-gray-600">Waktu</div>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-tl-2xl rounded-br-2xl border border-amber-200 bg-amber-50 text-amber-700">
                    <HandCoins size={21} />
                  </div>
                  <div className="text-lg font-bold text-gray-900">Amanah</div>
                  <div className="text-xs text-gray-600">Penyaluran</div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="text-lg font-bold text-gray-950">{formatCurrency(donation.current_amount)}</span>
                  {' '}terkumpul dari {formatCurrency(donation.target_amount)}
                </p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{formatPercentage(progress)}% terkumpul</span>
                  <span>Sisa: {formatCurrency(Math.max(donation.target_amount - donation.current_amount, 0))}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-amber-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi Program</h2>
              <div className="relative">
                <div className={`prose prose-lg max-w-none overflow-hidden transition-all ${showDescriptionFull ? '' : 'max-h-64'}`}>
                  <PortableText
                    value={donation.content}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
                        ),
                      },
                    }}
                  />
                </div>
                {!showDescriptionFull && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-white/0" />
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowDescriptionFull((current) => !current)}
                className="mt-4 rounded-lg bg-gray-100 px-5 py-2 text-sm font-bold text-gray-800 transition hover:bg-gray-200"
              >
                {showDescriptionFull ? 'Sembunyikan' : 'Selengkapnya'}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Info Terbaru</h2>
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
                Belum ada info terbaru untuk program ini.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Kontribusi</h2>
              {donation.records && donation.records.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {donation.records.map((record) => (
                    <div key={record._id} className="flex gap-3 py-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                        <UserCircle size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold capitalize text-gray-950">
                              {record.is_anonymous ? 'Hamba Allah' : record.donor_name || 'Hamba Allah'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {record.created_at ? new Date(record.created_at).toLocaleString('id-ID') : 'Baru saja'}
                            </p>
                          </div>
                          <p className="shrink-0 text-sm font-bold text-amber-700">{formatCurrency(record.amount)}</p>
                        </div>
                        {record.message && <p className="mt-2 text-sm text-gray-600">{record.message}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
                  Belum ada donatur.
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informasi Program</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Kategori:</span>
                  <span className="ml-2 text-gray-600">{donation.category}</span>
                </div>
                {donation.start_date && (
                  <div>
                    <span className="font-medium text-gray-700">Tanggal Mulai:</span>
                    <span className="ml-2 text-gray-600">{new Date(donation.start_date).toLocaleDateString('id-ID')}</span>
                  </div>
                )}
                {donation.end_date && (
                  <div>
                    <span className="font-medium text-gray-700">Tanggal Selesai:</span>
                    <span className="ml-2 text-gray-600">{new Date(donation.end_date).toLocaleDateString('id-ID')}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    donation.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {donation.is_active ? 'Aktif' : 'Tidak Aktif'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div id="donation-form" className="sticky top-8">
              {showForm ? (
                <DonationForm
                  programId={donation._id}
                  programTitle={donation.title}
                  onSubmit={handleDonationSubmit}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Donasi Sekarang</h3>
                  <p className="text-gray-600 mb-6">Bantu kami mewujudkan program ini dengan dukungan Anda.</p>
                  <button
                    onClick={openDonationForm}
                    className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                  >
                    Mulai Donasi
                  </button>

                  <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-medium text-amber-900 mb-2">Keamanan & Transparansi</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>- 100% Donasi Sampai ke Penerima</li>
                      <li>- Transaksi Aman & Terenkripsi</li>
                      <li>- Laporan Pertanggungjawaban Transparan</li>
                      <li>- Bisa Berdonasi Secara Anonim</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 mx-auto flex max-w-md gap-2 border-t border-gray-200 bg-white p-2 shadow-lg lg:hidden">
        <button
          type="button"
          onClick={handleShare}
          className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700"
          aria-label="Bagikan"
        >
          <Share2 size={22} />
        </button>
        <button
          type="button"
          onClick={openDonationForm}
          className="flex h-12 flex-1 items-center justify-center rounded-lg bg-amber-600 font-bold text-white"
        >
          Donasi Sekarang
        </button>
      </div>

      <button
        type="button"
        onClick={handleShare}
        className="fixed bottom-24 right-4 z-30 hidden h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-lg transition hover:bg-gray-50 lg:flex"
        aria-label="Bagikan"
      >
        <Share2 size={22} />
      </button>

      {shareOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-0 sm:px-4">
          <div className="w-full max-w-md rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4">
              <button
                type="button"
                onClick={() => setShareOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                aria-label="Tutup bagikan"
              >
                <X size={20} />
              </button>
              <h4 className="text-base font-bold text-gray-950">Bagikan Program</h4>
            </div>
            <div className="grid grid-cols-3 gap-3 p-4">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Yuk bantu program ini: ${window.location.href}`)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-gray-200 px-3 py-4 text-center text-sm font-semibold text-gray-700 hover:bg-green-50"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-gray-200 px-3 py-4 text-center text-sm font-semibold text-gray-700 hover:bg-blue-50"
              >
                Facebook
              </a>
              <button
                type="button"
                onClick={copyCurrentUrl}
                className="rounded-lg border border-gray-200 px-3 py-4 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Copy size={16} className="mx-auto mb-1" />
                Salin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetail;
