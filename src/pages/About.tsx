import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Check, Award, Users, Target, Clock } from 'lucide-react';

const About: React.FC = () => {
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
            Tentang Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white max-w-3xl mx-auto"
          >
            Mengenal lebih dekat Yayasan Cahaya Untuk Negeri, misi, visi, dan perjalanan kami membawa perubahan positif di Indonesia.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-6">Cerita <span className="text-yellow-500">Kami</span></h2>
              <p className="text-gray-700 mb-4">
                Yayasan Cahaya Untuk Negeri didirikan pada awal tahun 2025 oleh sekelompok profesional muda yang peduli dengan kondisi sosial di Indonesia. 
                Bermula dari kegiatan sosial kecil di beberapa daerah tertinggal, kami melihat besarnya kebutuhan akan pendidikan yang berkualitas dan kesempatan ekonomi yang merata.
              </p>
              <p className="text-gray-700 mb-4">
                Kami percaya bahwa setiap anak Indonesia, terlepas dari latar belakang sosial ekonomi mereka, berhak mendapatkan pendidikan yang baik. 
                Setiap keluarga berhak mendapatkan akses terhadap kesehatan dan penghidupan yang layak.
              </p>
              <p className="text-gray-700">
                Nama "Cahaya Untuk Negeri" mencerminkan visi kami untuk menjadi sumber cahaya yang menerangi jalan menuju Indonesia yang lebih baik. 
                Seperti cahaya yang menerangi kegelapan, kami berusaha membawa harapan dan perubahan positif ke tempat-tempat yang paling membutuhkan.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-500 rounded-tl-2xl z-0"></div>
                <img 
                  src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Tim Cahaya Untuk Negeri" 
                  className="w-full h-auto rounded-lg shadow-xl relative z-10"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-500 rounded-br-2xl z-0"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Visi & <span className="text-yellow-500">Misi</span></h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Landasan yang menjadi pedoman dalam setiap langkah dan program yang kami jalankan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Visi</h3>
              <p className="text-gray-700">
                Menjadi lembaga sosial terkemuka yang membawa perubahan positif dan berkelanjutan melalui pendidikan, kesehatan, dan pemberdayaan masyarakat, 
                serta berkontribusi dalam mewujudkan Indonesia yang lebih baik dengan pemerataan akses dan kesempatan bagi semua.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Check size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Misi</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <Check size={20} className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                  <span>
                    Memberikan akses pendidikan berkualitas bagi anak-anak dari keluarga kurang mampu melalui program beasiswa dan pengembangan fasilitas pendidikan.
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                  <span>
                    Meningkatkan kesejahteraan masyarakat melalui program pemberdayaan ekonomi, pelatihan keterampilan, dan pendampingan wirausaha.
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                  <span>
                    Mendorong keterlibatan aktif masyarakat, terutama generasi muda, dalam kegiatan sosial dan pembangunan berkelanjutan.
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                  <span>
                    Membangun kemitraan strategis dengan berbagai pihak untuk memperluas jangkauan dan dampak program.
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nilai-Nilai <span className="text-yellow-500">Kami</span></h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Prinsip-prinsip yang melandasi setiap keputusan dan tindakan kami dalam menjalankan program-program sosial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Heart size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Kepedulian</h3>
              <p className="text-gray-700">
                Kami memiliki kepedulian yang tulus terhadap kondisi masyarakat dan bekerja dengan hati untuk memberikan pelayanan terbaik.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Integritas</h3>
              <p className="text-gray-700">
                Kami berkomitmen untuk selalu jujur, transparan, dan bertanggung jawab dalam mengelola setiap program dan sumber daya.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Keberlanjutan</h3>
              <p className="text-gray-700">
                Kami merancang program yang berkelanjutan dan memberikan dampak jangka panjang, bukan hanya solusi sementara.
              </p>
            </motion.div>

            {/* Value 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Inklusivitas</h3>
              <p className="text-gray-700">
                Kami menghargai keberagaman dan memastikan program kami dapat diakses oleh semua kalangan tanpa diskriminasi.
              </p>
            </motion.div>

            {/* Value 5 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Inovasi</h3>
              <p className="text-gray-700">
                Kami terus mencari cara baru dan inovatif untuk mengatasi masalah sosial dan meningkatkan efektivitas program.
              </p>
            </motion.div>

            {/* Value 6 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Kolaborasi</h3>
              <p className="text-gray-700">
                Kami percaya pada kekuatan kerja sama dan sinergi dengan berbagai pihak untuk mencapai dampak yang lebih besar.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tim <span className="text-yellow-500">Kami</span></h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Individu-individu berdedikasi yang bekerja keras mewujudkan visi dan misi Cahaya Untuk Negeri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/5792639/pexels-photo-5792639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Ahmad Rahman" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Ahmad Rahman</h3>
                <p className="text-yellow-500 mb-3">Ketua Yayasan</p>
                <p className="text-gray-700 text-sm">
                  Mantan eksekutif perusahaan yang memutuskan untuk mendedikasikan hidupnya untuk kegiatan sosial.
                </p>
              </div>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3867300/pexels-photo-3867300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Ratna Dewi" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Ratna Dewi</h3>
                <p className="text-yellow-500 mb-3">Direktur Program</p>
                <p className="text-gray-700 text-sm">
                  Berpengalaman lebih dari 15 tahun di bidang pengembangan sosial dan pendidikan.
                </p>
              </div>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Dimas Prayoga" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Dimas Prayoga</h3>
                <p className="text-yellow-500 mb-3">Manajer Keuangan</p>
                <p className="text-gray-700 text-sm">
                  Ahli keuangan dengan komitmen untuk transparansi dan akuntabilitas dalam pengelolaan dana sosial.
                </p>
              </div>
            </motion.div>

            {/* Team Member 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/5212309/pexels-photo-5212309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Maya Lestari" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Maya Lestari</h3>
                <p className="text-yellow-500 mb-3">Koordinator Relawan</p>
                <p className="text-gray-700 text-sm">
                  Aktivis sosial yang berpengalaman dalam mengorganisir kegiatan relawan dan program pendampingan.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Bergabunglah Dengan Kami
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Jadilah bagian dari perjalanan kami untuk membawa perubahan positif di Indonesia. Setiap kontribusi, sekecil apapun, akan membuat perbedaan.
            </p>
            <a 
              href="/kontak"
              className="bg-white hover:bg-gray-100 text-yellow-500 px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300 inline-flex items-center"
            >
              <Heart size={20} className="mr-2" /> Menjadi Relawan
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;