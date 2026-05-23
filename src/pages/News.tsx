import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sanity, urlFor } from '../sanityClient';
import type { SanityImageSource } from '../sanityClient';

interface NewsArticle {
  _id: string;
  slug?: { current?: string };
  title: string;
  excerpt: string;
  publishedDate: string;
  author: string;
  category: string;
  image?: SanityImageSource;
  featured?: boolean;
}

const formatDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return '';

  return parsedDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const News: React.FC = () => {
  const [posts, setPosts] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    sanity
      .fetch<NewsArticle[]>(
        `*[_type == "post"] | order(coalesce(date, _createdAt) desc) {
          ...,
          "author": coalesce(author_ref->name, author),
          "category": coalesce(category_ref->title, category),
          "publishedDate": coalesce(date, _createdAt)
        }`
      )
      .then(setPosts);
  }, []);

  const categories = Array.from(
    new Set(posts.map((post) => post.category).filter(Boolean))
  );
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = normalizedSearch
      ? [post.title, post.excerpt, post.category, post.author]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch)
      : true;

    return matchesCategory && matchesSearch;
  });
  const featuredArticle = filteredPosts.find((article) => article.featured);
  const regularArticles = filteredPosts.filter((article) => !article.featured);

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Berita & Aktivitas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white max-w-3xl mx-auto"
          >
            Kabar terbaru tentang program, kegiatan, dan pencapaian Cahaya Untuk Negeri.
          </motion.p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedCategory === 'all'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Semua
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                  {featuredArticle.image && (
                    <img
                      src={urlFor(featuredArticle.image).url()}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-700 mb-6">{featuredArticle.excerpt}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-6">
                    <Calendar size={16} className="mr-1" />
                    <span className="mr-4">
                      {formatDate(featuredArticle.publishedDate)}
                    </span>
                    <User size={16} className="mr-1" />
                    <span>{featuredArticle.author}</span>
                  </div>
                  <Link
                    to={`/berita/${featuredArticle.slug?.current || featuredArticle._id}`}
                    className="inline-flex items-center text-yellow-500 font-medium hover:text-yellow-600"
                  >
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Berita Terbaru</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Link
                  to={`/berita/${article.slug?.current || article._id}`}
                  className="block h-full"
                >
                  <div className="h-48 overflow-hidden">
                    {article.image && (
                      <img
                        src={urlFor(article.image).width(400).url()}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                    <p className="text-gray-700 mb-4">{article.excerpt}</p>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <Calendar size={16} className="mr-1" />
                      <span className="mr-4">
                        {formatDate(article.publishedDate)}
                      </span>
                      <User size={16} className="mr-1" />
                      <span>{article.author}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center text-gray-600">
              <p className="font-medium">Belum ada berita yang dipublikasikan.</p>
              <p className="mt-2 text-sm">
                Konten akan muncul otomatis setelah dokumen Post dipublish dari Sanity.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Dapatkan Kabar Terbaru dari Kami</h2>
          <p className="text-white mb-8 max-w-2xl mx-auto">
            Berlangganan newsletter kami untuk mendapatkan informasi terbaru tentang program dan kegiatan Cahaya Untuk Negeri.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Alamat email Anda"
              className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none"
            />
            <button className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-r-lg font-medium transition-colors duration-300">
              Berlangganan
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ingin Berkontribusi <span className="text-yellow-500">Lebih Jauh?</span>
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Jadilah bagian dari perubahan positif dengan mendukung program-program Cahaya Untuk Negeri.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/donasi"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
            >
              Donasi Sekarang
            </Link>
            <Link
              to="/kontak"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
