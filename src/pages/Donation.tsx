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
  ChevronLeft,
  ChevronRight,
  X,
  Droplets,
  Filter,
  Grid3X3,
  HandHeart,
  HeartHandshake,
  Home,
  Landmark,
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

const WhatsAppLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

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

const fallbackDonationImages: Record<string, string[]> = {
  pendidikan: [
    'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
    'https://images.pexels.com/photos/5792639/pexels-photo-5792639.jpeg',
  ],
  kesehatan: [
    'https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg',
    'https://images.pexels.com/photos/3867300/pexels-photo-3867300.jpeg',
  ],
  sedekah: [
    'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg',
    'https://images.pexels.com/photos/6647118/pexels-photo-6647118.jpeg',
  ],
  kemanusiaan: [
    'https://images.pexels.com/photos/8423302/pexels-photo-8423302.jpeg',
    'https://images.pexels.com/photos/8849277/pexels-photo-8849277.jpeg',
  ],
  kurban: [
    'https://images.pexels.com/photos/4207908/pexels-photo-4207908.jpeg',
    'https://images.pexels.com/photos/4911715/pexels-photo-4911715.jpeg',
  ],
  palestina: [
    'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
    'https://images.pexels.com/photos/8942851/pexels-photo-8942851.jpeg',
  ],
  zakat: [
    'https://images.pexels.com/photos/6994985/pexels-photo-6994985.jpeg',
    'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg',
  ],
  sosial: [
    'https://images.pexels.com/photos/6647038/pexels-photo-6647038.jpeg',
    'https://images.pexels.com/photos/8423425/pexels-photo-8423425.jpeg',
  ],
  bencana: [
    'https://images.pexels.com/photos/8944484/pexels-photo-8944484.jpeg',
    'https://images.pexels.com/photos/8848952/pexels-photo-8848952.jpeg',
  ],
  'donasi-rutin': [
    'https://images.pexels.com/photos/6994926/pexels-photo-6994926.jpeg',
    'https://images.pexels.com/photos/9421664/pexels-photo-9421664.jpeg',
  ],
  lainnya: [
    'https://images.pexels.com/photos/9420711/pexels-photo-9420711.jpeg',
    'https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg',
  ],
};

const fallbackImagePool = Object.values(fallbackDonationImages).flat();

const getImageAssetRef = (image: unknown) => {
  if (!image || typeof image !== 'object') return undefined;
  const asset = (image as { asset?: { _ref?: string; _id?: string } }).asset;
  return asset?._ref || asset?._id;
};

const getFallbackImage = (donation: Donation, index: number) => {
  const categoryImages = fallbackDonationImages[donation.category] || fallbackImagePool;
  return categoryImages[index % categoryImages.length] || fallbackImagePool[index % fallbackImagePool.length];
};

const formatRemoteImage = (imageUrl: string, width: number, height: number) => {
  const separator = imageUrl.includes('?') ? '&' : '?';
  return `${imageUrl}${separator}auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop&dpr=2`;
};

const Donation: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('Terkini');
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

    const normalizedSearch = searchQuery.trim().toLowerCase();
    const searched = normalizedSearch
      ? filtered.filter((donation) => {
          return [
            donation.title,
            donation.description,
            donation.category,
          ]
            .join(' ')
            .toLowerCase()
            .includes(normalizedSearch);
        })
      : filtered;

    return [...searched].sort((a, b) => {
      if (sortBy === 'Terkumpul') return b.current_amount - a.current_amount;
      if (sortBy === 'Target') return b.target_amount - a.target_amount;
      return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
    });
  }, [donations, searchQuery, selectedCategory, sortBy]);

  const featuredDonations = donations.filter((donation) => donation.featured).slice(0, 6);
  const heroDonations = featuredDonations.length > 0 ? featuredDonations : donations.slice(0, 6);
  const heroDonation = heroDonations[activeSlide] || donations[0];
  const imageAssetUsage = useMemo(() => {
    return donations.reduce<Record<string, number>>((usage, donation) => {
      const assetRef = getImageAssetRef(donation.image);
      if (assetRef) {
        usage[assetRef] = (usage[assetRef] || 0) + 1;
      }
      return usage;
    }, {});
  }, [donations]);

  useEffect(() => {
    if (activeSlide >= heroDonations.length) {
      setActiveSlide(0);
    }
  }, [activeSlide, heroDonations.length]);

  useEffect(() => {
    if (heroDonations.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroDonations.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [heroDonations.length]);

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

  const changeSlide = (direction: 1 | -1) => {
    if (heroDonations.length === 0) return;
    setActiveSlide((current) => (current + direction + heroDonations.length) % heroDonations.length);
  };

  const donationImage = (donation: Donation, width: number, height: number, index = 0) => {
    const assetRef = getImageAssetRef(donation.image);
    const hasRepeatedImage = assetRef ? imageAssetUsage[assetRef] > 1 : false;
    if (!donation.image || hasRepeatedImage) {
      return formatRemoteImage(getFallbackImage(donation, index), width, height);
    }
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
            {heroDonation && (
              <img
                src={donationImage(heroDonation, 1200, 560, activeSlide)}
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
                  onClick={() => setSearchOpen(true)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-orange-50"
                  aria-label="Cari program"
                  type="button"
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

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {heroDonations.map((donation, index) => (
                    <button
                      key={donation._id}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`h-2 rounded-full transition ${
                        activeSlide === index ? 'w-6 bg-orange-400' : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Tampilkan slide ${index + 1}`}
                    />
                  ))}
                </div>

                {heroDonations.length > 1 && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => changeSlide(-1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
                      aria-label="Slide sebelumnya"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => changeSlide(1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
                      aria-label="Slide berikutnya"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {searchOpen && (
            <div className="absolute inset-4 z-20 rounded-lg bg-white/95 p-5 shadow-xl backdrop-blur lg:inset-6 lg:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 flex-1 items-center gap-3 rounded-lg border border-stone-200 bg-white px-4">
                  <Search size={22} className="text-slate-500" />
                  <input
                    autoFocus
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Cari program donasi"
                    className="h-full min-w-0 flex-1 bg-transparent text-base font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-stone-200 bg-white text-slate-700 transition hover:bg-stone-50"
                  aria-label="Tutup pencarian"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="mt-5 max-h-[175px] overflow-y-auto lg:max-h-[250px]">
                {filteredDonations.slice(0, 6).map((donation, index) => (
                  <Link
                    key={donation._id}
                    to={`/donasi/${donation.slug.current}`}
                    onClick={() => setSearchOpen(false)}
                    className="grid grid-cols-[64px_1fr] gap-3 border-b border-stone-100 py-3 transition hover:bg-orange-50"
                  >
                    <div className="h-16 overflow-hidden rounded-md bg-stone-200">
                      <img
                        src={donationImage(donation, 128, 128, index)}
                        alt={donation.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase text-orange-600">{donation.category}</p>
                      <h3 className="mt-1 line-clamp-2 text-sm font-bold text-slate-950">{donation.title}</h3>
                      <p className="mt-1 text-xs font-medium text-slate-600">{formatCurrency(donation.current_amount)}</p>
                    </div>
                  </Link>
                ))}

                {filteredDonations.length === 0 && (
                  <p className="rounded-lg border border-dashed border-stone-300 bg-stone-50 px-4 py-8 text-center text-sm text-slate-500">
                    Program tidak ditemukan.
                  </p>
                )}
              </div>
            </div>
          )}
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
            {featuredDonations.map((donation, index) => (
              <Link
                key={donation._id}
                to={`/donasi/${donation.slug.current}`}
                className="w-[190px] shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:border-orange-300"
              >
                <div className="h-[106px] bg-stone-200">
                  <img
                    src={donationImage(donation, 380, 220, index)}
                    alt={donation.title}
                    className="h-full w-full object-cover"
                  />
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
                    <img
                      src={donationImage(donation, 420, 260, index)}
                      alt={donation.title}
                      className="h-full w-full object-cover"
                    />
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
        className="fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-lg bg-[#25D366] text-white shadow-lg transition hover:bg-[#1ebe5d] md:right-8"
        aria-label="Hubungi WhatsApp"
      >
        <WhatsAppLogo className="h-7 w-7" />
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
