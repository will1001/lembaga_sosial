import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Users, GraduationCap, Landmark, Leaf, Clock } from 'lucide-react';

const Programs: React.FC = () => {
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
            Program Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white max-w-3xl mx-auto"
          >
            Berbagai inisiatif yang kami kembangkan untuk membawa perubahan positif dan meningkatkan kualitas hidup masyarakat Indonesia.
          </motion.p>
        </div>
      </section>

      {/* Programs Intro */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Program <span className="text-yellow-500">Unggulan</span></h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Kami fokus pada tiga pilar utama: pendidikan, pemberdayaan ekonomi, dan kesehatan masyarakat. Melalui program-program ini, kami berupaya menciptakan dampak yang berkelanjutan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Program Category 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/8423276/pexels-photo-8423276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Program Pendidikan"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Pendidikan</h3>
                <p className="text-gray-700 mb-4">
                  Menyediakan akses pendidikan berkualitas melalui beasiswa, pengembangan fasilitas, dan pelatihan untuk guru.
                </p>
                <a 
                  href="#pendidikan"
                  className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
                >
                  Lihat Program
                </a>
              </div>
            </motion.div>

            {/* Program Category 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/9420711/pexels-photo-9420711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Program Ekonomi"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                  <Landmark size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Pemberdayaan Ekonomi</h3>
                <p className="text-gray-700 mb-4">
                  Membantu meningkatkan kesejahteraan ekonomi melalui pelatihan keterampilan, modal usaha, dan pendampingan bisnis.
                </p>
                <a 
                  href="#ekonomi"
                  className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
                >
                  Lihat Program
                </a>
              </div>
            </motion.div>

            {/* Program Category 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Program Kesehatan"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                  <Heart size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Kesehatan Masyarakat</h3>
                <p className="text-gray-700 mb-4">
                  Meningkatkan akses layanan kesehatan dasar dan edukasi kesehatan untuk masyarakat di daerah terpencil.
                </p>
                <a 
                  href="#kesehatan"
                  className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
                >
                  Lihat Program
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Programs */}
      <section id="pendidikan" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="md:w-1/3 mb-8 md:mb-0 md:pr-12">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                <GraduationCap size={36} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-center md:text-left">Program <span className="text-yellow-500">Pendidikan</span></h2>
              <p className="text-gray-700 text-center md:text-left">
                Kami percaya pendidikan adalah kunci untuk memutus rantai kemiskinan dan membuka pintu kesempatan bagi masa depan yang lebih baik.
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Program 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-3">Beasiswa Cahaya Ilmu</h3>
                <p className="text-gray-700 mb-4">
                  Program beasiswa untuk siswa berprestasi dari keluarga kurang mampu di tingkat SD hingga perguruan tinggi, mencakup biaya pendidikan dan tunjangan bulanan.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>500+ Penerima</span>
                  <span>Sejak 2025</span>
                </div>
              </motion.div>

              {/* Program 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-3">Sekolah Untuk Semua</h3>
                <p className="text-gray-700 mb-4">
                  Pembangunan dan renovasi fasilitas pendidikan di daerah terpencil, termasuk perpustakaan, laboratorium, dan fasilitas sanitasi.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>25+ Sekolah</span>
                  <span>5+ Provinsi</span>
                </div>
              </motion.div>

              {/* Program 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-3">Pelatihan Guru Inspiratif</h3>
                <p className="text-gray-700 mb-4">
                  Program pelatihan untuk meningkatkan kualitas dan kapasitas guru di daerah tertinggal dengan metode pengajaran yang inovatif dan kreatif.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>300+ Guru</span>
                  <span>10+ Kabupaten</span>
                </div>
              </motion.div>

              {/* Program 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-3">Perpustakaan Digital</h3>
                <p className="text-gray-700 mb-4">
                  Penyediaan akses digital ke berbagai materi pembelajaran melalui komputer dan internet di daerah yang minim akses informasi.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>15+ Lokasi</span>
                  <span>1000+ Pengguna</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Economic Empowerment Programs */}
      <section id="ekonomi" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center mb-16">
            <div className="md:w-1/3 mb-8 md:mb-0 md:pl-12">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Landmark size={36} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-center md:text-left">Pemberdayaan <span className="text-yellow-500">Ekonomi</span></h2>
              <p className="text-gray-700 text-center md:text-left">
                Membantu masyarakat membangun kemandirian ekonomi melalui pengembangan keterampilan dan usaha yang berkelanjutan.
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Program 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-3">Wirausaha Mandiri</h3>
                <p className="text-gray-700 mb-4">
                  Pelatihan kewirausahaan, pemberian modal awal, dan pendampingan usaha untuk keluarga prasejahtera agar dapat memulai usaha kecil.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>250+ Peserta</span>
                  <span>150+ Usaha Baru</span>
                </div>
              </motion.div>

              {/* Program 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-3">Koperasi Desa</h3>
                <p className="text-gray-700 mb-4">
                  Pembentukan dan pendampingan koperasi di tingkat desa untuk memfasilitasi akses keuangan dan pemasaran produk lokal.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>15+ Koperasi</span>
                  <span>500+ Anggota</span>
                </div>
              </motion.div>

              {/* Program 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-3">Pelatihan Keterampilan</h3>
                <p className="text-gray-700 mb-4">
                  Program pelatihan berbagai keterampilan praktis seperti menjahit, memasak, kerajinan tangan, dan perbaikan elektronik.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>10+ Jenis Pelatihan</span>
                  <span>400+ Peserta</span>
                </div>
              </motion.div>

              {/* Program 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-3">Digital Marketing</h3>
                <p className="text-gray-700 mb-4">
                  Pelatihan pemasaran digital untuk pelaku UMKM agar dapat memperluas jangkauan pasar melalui platform online.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>200+ UMKM</span>
                  <span>5+ Kota</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Programs */}
      <section id="kesehatan" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="md:w-1/3 mb-8 md:mb-0 md:pr-12">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Heart size={36} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-center md:text-left">Kesehatan <span className="text-yellow-500">Masyarakat</span></h2>
              <p className="text-gray-700 text-center md:text-left">
                Meningkatkan akses terhadap layanan kesehatan dasar dan edukasi tentang pola hidup sehat di masyarakat.
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Program 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-3">Klinik Keliling</h3>
                <p className="text-gray-700 mb-4">
                  Layanan kesehatan bergerak yang menjangkau daerah terpencil dengan fasilitas terbatas untuk pemeriksaan dan pengobatan dasar.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>30+ Desa</span>
                  <span>5000+ Pasien</span>
                </div>
              </motion.div>

              {/* Program 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-3">Sanitasi Bersih</h3>
                <p className="text-gray-700 mb-4">
                  Pembangunan fasilitas air bersih dan sanitasi di daerah yang minim akses, serta edukasi tentang pola hidup bersih.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>20+ Fasilitas</span>
                  <span>15+ Desa</span>
                </div>
              </motion.div>

              {/* Program 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-3">Posyandu Mandiri</h3>
                <p className="text-gray-700 mb-4">
                  Pengembangan kapasitas kader posyandu dan peningkatan fasilitas untuk monitoring gizi dan kesehatan ibu dan anak.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>25+ Posyandu</span>
                  <span>100+ Kader</span>
                </div>
              </motion.div>

              {/* Program 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-3">Edukasi Kesehatan</h3>
                <p className="text-gray-700 mb-4">
                  Program penyuluhan dan edukasi tentang berbagai isu kesehatan seperti gizi, kesehatan reproduksi, dan pencegahan penyakit.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>50+ Sesi</span>
                  <span>2000+ Peserta</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Program <span className="text-yellow-500">Mendatang</span></h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Berbagai inisiatif baru yang sedang kami kembangkan untuk memperluas dampak dan menjangkau lebih banyak masyarakat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Upcoming Program 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500"
            >
              <div className="flex items-center mb-4">
                <Clock size={20} className="text-yellow-500 mr-2" />
                <span className="text-sm text-yellow-500 font-medium">Segera Diluncurkan</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Taman Baca Digital</h3>
              <p className="text-gray-700">
                Program perpustakaan digital yang akan menyediakan akses e-book dan materi pendidikan online untuk anak-anak di daerah terpencil.
              </p>
            </motion.div>

            {/* Upcoming Program 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500"
            >
              <div className="flex items-center mb-4">
                <Clock size={20} className="text-yellow-500 mr-2" />
                <span className="text-sm text-yellow-500 font-medium">Dalam Pengembangan</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Pertanian Berkelanjutan</h3>
              <p className="text-gray-700">
                Program pelatihan dan pendampingan untuk petani dalam mengadopsi teknik pertanian yang ramah lingkungan dan berkelanjutan.
              </p>
            </motion.div>

            {/* Upcoming Program 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500"
            >
              <div className="flex items-center mb-4">
                <Clock size={20} className="text-yellow-500 mr-2" />
                <span className="text-sm text-yellow-500 font-medium">Perencanaan Awal</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Kursus Coding Untuk Remaja</h3>
              <p className="text-gray-700">
                Program pelatihan pemrograman komputer untuk remaja dari keluarga prasejahtera guna mempersiapkan mereka menghadapi era digital.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Dukung Program Kami
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Bantu kami mewujudkan program-program ini dengan menjadi donatur atau relawan. Setiap kontribusi Anda sangat berarti.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/donasi"
                className="bg-white hover:bg-gray-100 text-yellow-500 px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                <Heart size={20} className="mr-2" /> Donasi Sekarang
              </a>
              <a 
                href="/kontak"
                className="bg-transparent hover:bg-yellow-600 text-white border-2 border-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                <Users size={20} className="mr-2" /> Menjadi Relawan
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Programs;