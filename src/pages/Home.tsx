import React, { useEffect, useState } from "react";
import { sanity, urlFor } from "../sanityClient";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  BookOpen,
  Users,
  GraduationCap,
  SunMedium,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";

const Home: React.FC = () => {
  const [dashboard, setDashboard] = useState();
  const [program, setProgram] = useState();

  useEffect(() => {
    sanity.fetch(`*[_type == "dashboard"]`).then((data) => {
      if (data && data.length > 0) {
        setDashboard(data[0]); // Ambil yang pertama
      }
    });
  }, []);

  useEffect(() => {
    sanity
      .fetch(`*[_type == "program" && featured == true][0...3]`)
      .then((data) => {
        if (data && data.length > 0) {
          setProgram(data); // Ambil yang pertama
        }
      });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="text-yellow-500">{dashboard?.home_title}</span>
            </h1>
            <p className="text-xl text-white mb-8">{dashboard?.home_desc}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/donasi"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                <Heart size={20} className="mr-2" /> Donasi Sekarang
              </Link>
              <Link
                to="/program"
                className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                Program Kami <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-6">
                Tentang{" "}
                <span className="text-yellow-500">Cahaya Untuk Negeri</span>
              </h2>

              <PortableText value={dashboard?.about} />
              <Link
                to="/tentang-kami"
                className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
              >
                Pelajari Lebih Lanjut <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-[500px]"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-500 rounded-tl-2xl z-0"></div>
                {dashboard?.about_image && (
                  <img
                    src={urlFor(dashboard?.about_image).url()}
                    alt="Kegiatan Cahaya Untuk Negeri"
                    className="w-[500px] h-auto rounded-lg shadow-xl relative z-10"
                  />
                )}

                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-500 rounded-br-2xl z-0"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Program <span className="text-yellow-500">Unggulan Kami</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Kami mengembangkan berbagai program untuk membantu masyarakat
              Indonesia dalam bidang pendidikan, kesehatan, dan pengembangan
              ekonomi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {program?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={urlFor(item?.image).url()}
                    alt="Program Pendidikan"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                    <BookOpen size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item?.category}</h3>
                  <p className="text-gray-700 mb-4">{item?.desc}</p>
                  <Link
                    to="/program"
                    className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
                  >
                    Selengkapnya <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
                  <Users size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Pemberdayaan Masyarakat
                </h3>
                <p className="text-gray-700 mb-4">
                  Program pelatihan keterampilan dan wirausaha untuk
                  meningkatkan kesejahteraan ekonomi masyarakat.
                </p>
                <Link
                  to="/program"
                  className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
                >
                  Selengkapnya <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Program Edukasi"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Pengembangan Pendidikan
                </h3>
                <p className="text-gray-700 mb-4">
                  Program pengembangan fasilitas pendidikan dan pelatihan untuk
                  guru di daerah tertinggal.
                </p>
                <Link
                  to="/program"
                  className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
                >
                  Selengkapnya <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div> */}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/program"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md text-lg font-medium transition-colors duration-300 inline-flex items-center"
            >
              Lihat Semua Program <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Dampak <span className="text-yellow-500">Positif Kami</span></h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Bersama dengan dukungan relawan dan donatur, kami telah membuat perbedaan nyata dalam kehidupan masyarakat Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <h3 className="text-4xl font-bold text-yellow-500 mb-4">2,500+</h3>
              <p className="text-gray-700">Penerima Beasiswa</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <h3 className="text-4xl font-bold text-yellow-500 mb-4">50+</h3>
              <p className="text-gray-700">Desa Binaan</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <h3 className="text-4xl font-bold text-yellow-500 mb-4">100+</h3>
              <p className="text-gray-700">Relawan Aktif</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <h3 className="text-4xl font-bold text-yellow-500 mb-4">15+</h3>
              <p className="text-gray-700">Provinsi Terjangkau</p>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Apa Kata <span className="text-yellow-500">Mereka?</span></h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Cerita inspiratif dari penerima manfaat program Cahaya Untuk Negeri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Siti Nurhaliza" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Siti Nurhaliza</h3>
                  <p className="text-gray-600">Penerima Beasiswa</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Berkat beasiswa dari Cahaya Untuk Negeri, saya bisa melanjutkan kuliah dan menjadi dokter. 
                Saya berjanji akan mengabdikan diri untuk membantu masyarakat yang membutuhkan."
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Budi Santoso" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Budi Santoso</h3>
                  <p className="text-gray-600">Peserta Program Wirausaha</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Program pelatihan wirausaha dari Cahaya Untuk Negeri membantu saya memulai usaha kecil-kecilan. 
                Sekarang saya bisa menghidupi keluarga dan bahkan mempekerjakan tetangga."
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Dewi Anggraini" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Dewi Anggraini</h3>
                  <p className="text-gray-600">Guru di Desa Binaan</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Pelatihan guru yang diberikan oleh Cahaya Untuk Negeri membuka wawasan saya tentang metode mengajar yang lebih efektif. 
                Murid-murid saya sekarang lebih bersemangat belajar."
              </p>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="py-20 bg-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SunMedium size={48} className="text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Jadilah Bagian dari Perubahan
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan kami untuk membawa cahaya harapan bagi mereka
              yang membutuhkan. Setiap kontribusi, sekecil apapun, akan membuat
              perbedaan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/donasi"
                className="bg-white hover:bg-gray-100 text-yellow-500 px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                <Heart size={20} className="mr-2" /> Donasi Sekarang
              </Link>
              <Link
                to="/kontak"
                className="bg-transparent hover:bg-yellow-600 text-white border-2 border-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                Hubungi Kami <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
