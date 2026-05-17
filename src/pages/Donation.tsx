import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowDownWideNarrow,
  Beef,
  BookOpen,
  Building2,
  Droplets,
  Filter,
  Grid3X3,
  HandHeart,
  HeartHandshake,
  Home,
  Landmark,
  MessageCircle,
  Newspaper,
  Search,
  ShieldAlert,
  Sprout,
  UserCircle,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';

const builder = imageUrlBuilder(client);

function urlFor(source: unknown) {
  return builder.image(source);
}

interface Donation {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  image: unknown;
  content: unknown;
  target_amount: number;
  current_amount: number;
  donors_count: number;
  category: string;
  is_active: boolean;
  featured: boolean;
  start_date?: string;
  end_date?: string;
  _createdAt: string;
}

type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
};

const categories: Category[] = [
  { id: 'kurban', name: 'Kurban', icon: Beef },
  { id: 'palestina', name: 'Palestina', icon: Landmark },
  { id: 'pendidikan', name: 'Pendidikan', icon: BookOpen },
  { id: 'kesehatan', name: 'Kesehatan', icon: Droplets },
  { id: 'kemanusiaan', name: 'Kemanusiaan', icon: HeartHandshake },
  { id: 'donasi-rutin', name: 'Donasi Rutin', icon: HandHeart },
  { id: 'bencana', name: 'Bencana', icon: ShieldAlert },
  { id: 'zakat', name: 'Zakat', icon: Building2 },
  { id: 'sosial', name: 'Sosial', icon: Users },
  { id: 'sedekah', name: 'Sedekah', icon: Sprout },
  { id: 'lainnya', name: 'Lainnya', icon: Grid3X3 },
];

const sortOptions = ['Terkini', 'Terkumpul', 'Target'] as const;
type SortOption = (typeof sortOptions)[number];

const Donation: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('Terkini');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const query = `*[_type == "donation" && is_active == true] | order(featured desc, _createdAt desc) {
          _id,
          _createdAt,
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

  const filteredDonations = useMemo(() => {
    const filtered =
      selectedCategory === 'all'
        ? donations
        : donations.filter((donation) => donation.category === selectedCategory);

    return [...filtered].sort((a, b) => {
      if (sortBy === 'Terkumpul') return b.current_amount - a.current_amount;
      if (sortBy === 'Target') return b.target_amount - a.target_amount;
      return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
    });
  }, [donations, selectedCategory, sortBy]);

  const featuredDonations = donations.filter((donation) => donation.featured).slice(0, 6);
  const heroDonation = donations[0];

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

  const getDaysLeft = (endDate?: string) => {
    if (!endDate) return 'Terbuka';
    const today = new Date();
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} Hari lagi` : 'Berakhir';
  };

  const cycleSort = () => {
    const currentIndex = sortOptions.indexOf(sortBy);
    setSortBy(sortOptions[(currentIndex + 1) % sortOptions.length]);
  };

  const donationImage = (donation: Donation, width: number, height: number) => {
    if (!donation.image) return '';
    return urlFor(donation.image).width(width).height(height).fit('crop').url();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-orange-100 border-b-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 pb-24 pt-20">
      <div className="mx-auto max-w-[480px] bg-white shadow-xl md:my-6 md:rounded-lg md:border md:border-stone-200 lg:max-w-6xl">
        <section className="relative p-4 lg:p-6">
          <div className="relative min-h-[260px] overflow-hidden rounded-lg bg-emerald-900 lg:min-h-[360px]">
            {heroDonation?.image && (
              <img
                src={donationImage(heroDonation, 1200, 560)}
                alt={heroDonation.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/70 to-emerald-800/10" />
            <div className="relative flex h-full min-h-[260px] flex-col justify-between p-5 text-white lg:min-h-[360px] lg:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-orange-100">Cahaya Untuk Negeri</p>
                  <p className="mt-1 text-sm text-emerald-50">Program donasi pilihan</p>
                </div>
                <button
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-orange-50"
                  aria-label="Cari program"
                >
                  <Search size={24} />
                </button>
              </div>

              <div className="max-w-sm">
                <h1 className="text-3xl font-bold leading-tight lg:text-5xl">
                  {heroDonation?.title || 'Program Donasi'}
                </h1>
                <p className="mt-3 max-w-xs text-sm font-medium text-emerald-50 lg:text-base">
                  {heroDonation?.description ||
                    'Dukung program sosial untuk pendidikan, kesehatan, dan kesejahteraan masyarakat.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/40" />
                <span className="h-2 w-6 rounded-full bg-orange-400" />
                <span className="h-2 w-2 rounded-full bg-white/40" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-stone-200 px-4 pb-5 lg:px-6">
          <div className="grid grid-cols-5 gap-3 lg:grid-cols-10">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-lg border text-xs font-medium transition ${
                selectedCategory === 'all'
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-transparent bg-white text-slate-700 hover:bg-stone-50'
              }`}
            >
              <Grid3X3 size={22} />
              Semua
            </button>
            {categories.map((category) => {
              const Icon = category.icon;
              const active = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-lg border text-center text-xs font-medium transition ${
                    active
                      ? 'border-orange-500 bg-orange-50 text-orange-600'
                      : 'border-transparent bg-white text-slate-700 hover:bg-stone-50'
                  }`}
                >
                  <Icon size={22} />
                  <span className="leading-tight">{category.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="border-b border-stone-200 px-4 py-5 lg:px-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">Program Pilihan</h2>
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              Lainnya
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3">
            {featuredDonations.map((donation) => (
              <Link
                key={donation._id}
                to={`/donasi/${donation.slug.current}`}
                className="w-[190px] shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:border-orange-300"
              >
                <div className="h-[106px] bg-stone-200">
                  {donation.image && (
                    <img
                      src={donationImage(donation, 380, 220)}
                      alt={donation.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold leading-tight text-slate-950">
                    {donation.title}
                  </h3>
                  <div className="mt-3 h-2 rounded-full bg-stone-200">
                    <div
                      className="h-2 rounded-full bg-orange-500"
                      style={{
                        width: `${progressPercentage(donation.current_amount, donation.target_amount)}%`,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-slate-700">
                    {formatCurrency(donation.current_amount)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4 py-5 lg:px-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-orange-500 px-4 text-sm font-medium text-orange-600 transition hover:bg-orange-50"
              >
                <Filter size={16} />
                Filter
              </button>
              <button
                onClick={cycleSort}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-orange-500 px-4 text-sm font-medium text-orange-600 transition hover:bg-orange-50"
              >
                <ArrowDownWideNarrow size={16} />
                {sortBy}
              </button>
            </div>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-orange-500 text-orange-600 transition hover:bg-orange-50"
              aria-label="Tampilan grid"
            >
              <Grid3X3 size={18} />
            </button>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {filteredDonations.map((donation, index) => (
              <motion.div
                key={donation._id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
              >
                <Link
                  to={`/donasi/${donation.slug.current}`}
                  className="grid min-h-[118px] grid-cols-[42%_1fr] overflow-hidden rounded-lg border border-stone-200 bg-white transition hover:border-orange-300 hover:shadow-md"
                >
                  <div className="bg-stone-200">
                    {donation.image && (
                      <img
                        src={donationImage(donation, 420, 260)}
                        alt={donation.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-between p-3">
                    <div>
                      <span className="text-[11px] font-semibold uppercase text-orange-600">
                        {donation.category}
                      </span>
                      <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-slate-950">
                        {donation.title}
                      </h3>
                    </div>
                    <div>
                      <div className="h-2 rounded-full bg-stone-200">
                        <div
                          className="h-2 rounded-full bg-orange-500"
                          style={{
                            width: `${progressPercentage(donation.current_amount, donation.target_amount)}%`,
                          }}
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slate-700">
                        <span className="font-medium">{formatCurrency(donation.current_amount)}</span>
                        <span>{getDaysLeft(donation.end_date)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredDonations.length === 0 && (
            <div className="rounded-lg border border-dashed border-stone-300 bg-stone-50 px-4 py-10 text-center text-sm text-slate-500">
              Belum ada program donasi dalam kategori ini.
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className="h-10 rounded-full bg-orange-500 px-10 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Lihat Semua
            </button>
          </div>
        </section>

        <section className="border-t border-orange-100 bg-orange-50 px-6 py-8 text-center">
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-700">
            Lembaga sosial yang dikelola secara amanah dan profesional untuk menghadirkan
            dampak pendidikan, kesehatan, dan pemberdayaan masyarakat.
          </p>
          <Link to="/tentang-kami" className="mt-4 inline-block text-sm font-medium text-orange-700">
            Tentang Cahaya Untuk Negeri
          </Link>
        </section>
      </div>

      <a
        href="https://wa.me/6287887705166"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white shadow-lg transition hover:bg-green-600 md:right-8"
        aria-label="Hubungi WhatsApp"
      >
        <MessageCircle size={26} />
      </a>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-stone-200 bg-white shadow-[0_-8px_24px_rgba(15,23,42,0.08)] md:hidden">
        <div className="mx-auto grid h-16 max-w-[480px] grid-cols-3">
          <Link to="/" className="flex flex-col items-center justify-center gap-1 text-orange-500">
            <Home size={23} />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link to="/berita" className="flex flex-col items-center justify-center gap-1 text-stone-500">
            <Newspaper size={22} />
            <span className="text-xs font-medium">Berita</span>
          </Link>
          <Link to="/kontak" className="flex flex-col items-center justify-center gap-1 text-stone-500">
            <UserCircle size={22} />
            <span className="text-xs font-medium">Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Donation;
