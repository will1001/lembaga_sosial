import React, { useState, useEffect } from 'react';
import { client } from '../sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';

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

const Donation: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'zakat', name: 'Zakat' },
    { id: 'infak', name: 'Infak' },
    { id: 'sedekah', name: 'Sedekah' },
    { id: 'kurban', name: 'Kurban' },
    { id: 'pendidikan', name: 'Pendidikan' },
    { id: 'kesehatan', name: 'Kesehatan' },
    { id: 'bencana', name: 'Bencana' },
    { id: 'lainnya', name: 'Lainnya' }
  ];

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const query = `*[_type == "donation" && is_active == true] | order(featured desc, _createdAt desc) {
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

        const result = await client.fetch(query);
        setDonations(result);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const filteredDonations = selectedCategory === 'all'
    ? donations
    : donations.filter(d => d.category === selectedCategory);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Program Donasi
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bergabunglah dalam kebaikan. Dukung program-program kami untuk membantu sesama.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Donation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDonations.map((donation) => (
            <motion.div
              key={donation._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {donation.featured && (
                <div className="bg-amber-600 text-white px-3 py-1 text-sm font-medium">
                  Program Unggulan
                </div>
              )}

              <div className="relative h-48">
                {donation.image && (
                  <img
                    src={urlFor(donation.image).width(400).height(300).url()}
                    alt={donation.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {donation.category.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {donation.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {donation.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Terkumpul</span>
                    <span>{formatCurrency(donation.current_amount)} / {formatCurrency(donation.target_amount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage(donation.current_amount, donation.target_amount)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{donation.donors_count} Donatur</span>
                    <span>{Math.round(progressPercentage(donation.current_amount, donation.target_amount))}%</span>
                  </div>
                </div>

                <button
                  onClick={() => window.location.href = `/donasi/${donation.slug.current}`}
                  className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  Donasi Sekarang
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDonations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              Belum ada program donasi dalam kategori ini.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donation;