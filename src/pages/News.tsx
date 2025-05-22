import React, { useEffect, useState } from 'react'
import { sanity, urlFor } from '../sanityClient'
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  featured?: boolean;
}

const News: React.FC = () => {


   const [posts, setPosts] = useState([])

  useEffect(() => {
    sanity.fetch(`*[_type == "post"]`)
      .then(setPosts)
  }, [])
  
  const articles: NewsArticle[] = [
    {
      id: 1,
      title: "Program Beasiswa Cahaya Ilmu Dibuka untuk Tahun Ajaran 2025/2026",
      excerpt: "Yayasan Cahaya Untuk Negeri membuka pendaftaran beasiswa bagi siswa berprestasi dari keluarga kurang mampu untuk tahun ajaran 2025/2026.",
      date: "15 Juni 2025",
      author: "Tim Pendidikan",
      category: "Pendidikan",
      image: "https://images.pexels.com/photos/8423276/pexels-photo-8423276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      featured: true
    },
    {
      id: 2,
      title: "Klinik Keliling Menjangkau 10 Desa Terpencil di Kalimantan",
      excerpt: "Program klinik keliling Cahaya Untuk Negeri berhasil memberikan layanan kesehatan dasar kepada lebih dari 2.000 warga di daerah terpencil Kalimantan.",
      date: "28 Mei 2025",
      author: "Tim Kesehatan",
      category: "Kesehatan",
      image: "https://images.pexels.com/photos/6647118/pexels-photo-6647118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      title: "Pelatihan Wirausaha Bagi Ibu Rumah Tangga di Jakarta Timur",
      excerpt: "Sebanyak 50 ibu rumah tangga di Jakarta Timur mengikuti pelatihan kewirausahaan yang diselenggarakan oleh Cahaya Untuk Negeri dalam upaya meningkatkan ekonomi keluarga.",
      date: "10 Mei 2025",
      author: "Tim Ekonomi",
      category: "Ekonomi",
      image: "https://images.pexels.com/photos/8848952/pexels-photo-8848952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 4,
      title: "Cahaya Untuk Negeri Menjalin Kerjasama dengan 5 Universitas Negeri",
      excerpt: "Yayasan Cahaya Untuk Negeri menandatangani nota kesepahaman dengan lima universitas negeri untuk program beasiswa dan pengembangan pendidikan.",
      date: "2 Mei 2025",
      author: "Tim Humas",
      category: "Kerjasama",
      image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 5,
      title: "Aksi Bersih Sungai di Bandung Diikuti Ratusan Relawan",
      excerpt: "Aksi bersih sungai yang diinisiasi oleh Cahaya Untuk Negeri di Bandung diikuti oleh ratusan relawan dari berbagai kalangan dalam upaya melestarikan lingkungan.",
      date: "25 April 2025",
      author: "Tim Lingkungan",
      category: "Lingkungan",
      image: "https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 6,
      title: "Perpustakaan Digital Diluncurkan di 5 Sekolah Daerah Terpencil",
      excerpt: "Program perpustakaan digital Cahaya Untuk Negeri resmi diluncurkan di lima sekolah di daerah terpencil untuk meningkatkan akses terhadap materi pembelajaran.",
      date: "18 April 2025",
      author: "Tim Pendidikan",
      category: "Pendidikan",
      image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const featuredArticle = posts.find(article => article.featured);
  const regularArticles = posts.filter(article => !article.featured);

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
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium">Semua</button>
              <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">Pendidikan</button>
              <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">Kesehatan</button>
              <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">Ekonomi</button>
              <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">Lingkungan</button>
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
                  <img 
                    src={urlFor(featuredArticle.image).url()} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredArticle.title}</h2>
                  <p className="text-gray-700 mb-6">{featuredArticle.excerpt}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-6">
                    <Calendar size={16} className="mr-1" />
                    <span className="mr-4">{featuredArticle.date}</span>
                    <User size={16} className="mr-1" />
                    <span>{featuredArticle.author}</span>
                  </div>
                  <a 
                    href={`/berita/${featuredArticle.id}`}
                    className="inline-flex items-center text-yellow-500 font-medium hover:text-yellow-600"
                  >
                    Baca Selengkapnya <ArrowRight size={16} className="ml-2" />
                  </a>
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
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={urlFor(article.image).width(400).url()} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                  <p className="text-gray-700 mb-4">{article.excerpt}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Calendar size={16} className="mr-1" />
                    <span className="mr-4">{article.date}</span>
                    <User size={16} className="mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <a 
                    href={`/berita/${article.id}`}
                    className="inline-flex items-center text-yellow-500 font-medium hover:text-yellow-600"
                  >
                    Baca Selengkapnya <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-2">
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white font-medium"
              >
                1
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200"
              >
                2
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200"
              >
                3
              </a>
              <span className="text-gray-700">...</span>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200"
              >
                10
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200"
              >
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
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
          <h2 className="text-3xl font-bold mb-6">Ingin Berkontribusi <span className="text-yellow-500">Lebih Jauh?</span></h2>
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