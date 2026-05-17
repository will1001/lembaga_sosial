import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { client } from '../sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import DonationForm, { DonationSubmitData } from '../components/DonationForm';
import { createDonationTransaction, createMidtransSnapTransaction, saveDonationTransaction } from '../utils/payment';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
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
}

const DonationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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
          end_date
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
    return Math.min((current / target) * 100, 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return Math.round(percentage);
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Program donasi tidak ditemukan
          </h2>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      {/* Hero Section */}
      <div className="relative h-96">
        {donation.image && (
          <img
            src={urlFor(donation.image).width(1200).height(400).url()}
            alt={donation.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {donation.title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {donation.category.toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">
                    {formatPercentage(progressPercentage(donation.current_amount, donation.target_amount))}%
                  </div>
                  <div className="text-sm text-gray-600">Terkumpul</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatCurrency(donation.current_amount)}
                  </div>
                  <div className="text-sm text-gray-600">Dana Terkumpul</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {donation.donors_count}
                  </div>
                  <div className="text-sm text-gray-600">Donatur</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Target: {formatCurrency(donation.target_amount)}</span>
                  <span>Sisa: {formatCurrency(donation.target_amount - donation.current_amount)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-amber-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage(donation.current_amount, donation.target_amount)}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Deskripsi Program
              </h2>
              <div className="prose prose-lg max-w-none">
                <PortableText
                  value={donation.content}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {children}
                        </p>
                      ),
                    },
                  }}
                />
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Informasi Program
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Kategori:</span>
                  <span className="ml-2 text-gray-600">{donation.category}</span>
                </div>
                {donation.start_date && (
                  <div>
                    <span className="font-medium text-gray-700">Tanggal Mulai:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(donation.start_date).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                )}
                {donation.end_date && (
                  <div>
                    <span className="font-medium text-gray-700">Tanggal Selesai:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(donation.end_date).toLocaleDateString('id-ID')}
                    </span>
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

          {/* Sidebar - Donation Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Donasi Sekarang
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Bantu kami mewujudkan program ini dengan dukungan Anda.
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                  >
                    Mulai Donasi
                  </button>

                  <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-medium text-amber-900 mb-2">
                      Keamanan & Transparansi
                    </h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>✓ 100% Donasi Sampai ke Penerima</li>
                      <li>✓ Transaksi Aman & Terenkripsi</li>
                      <li>✓ Laporan Pertanggungjawaban Transparan</li>
                      <li>✓ Bisa Berdonasi Secara Anonim</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetail;
