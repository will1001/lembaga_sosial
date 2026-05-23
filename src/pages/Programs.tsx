import React, { useEffect, useState } from "react";
import { sanity, urlFor } from "../sanityClient";
import type { SanityImageSource } from "../sanityClient";

import { motion } from "framer-motion";
import {
  Heart,
  Users,
  GraduationCap,
} from "lucide-react";

type ProgramItem = {
  _id: string;
  image?: SanityImageSource;
  category?: string;
  desc?: string;
};

const Programs: React.FC = () => {
  const [program, setProgram] = useState<ProgramItem[]>([]);
  useEffect(() => {
    sanity.fetch<ProgramItem[]>(`*[_type == "program"] | order(_updatedAt desc)`).then((data) => {
      if (data && data.length > 0) {
        setProgram(data);
      }
    });
  }, []);
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
            Berbagai inisiatif yang kami kembangkan untuk membawa perubahan
            positif dan meningkatkan kualitas hidup masyarakat Indonesia.
          </motion.p>
        </div>
      </section>

      {/* Programs Intro */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Program <span className="text-yellow-500">Unggulan</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Kami fokus pada tiga pilar utama: pendidikan, pemberdayaan
              ekonomi, dan kesehatan masyarakat. Melalui program-program ini,
              kami berupaya menciptakan dampak yang berkelanjutan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {program.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  {item.image && (
                    <img
                      src={urlFor(item.image).url()}
                      alt={item.category || "Program Cahaya Untuk Negeri"}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item?.category}</h3>
                  <p className="text-gray-700 mb-4">{item?.desc}</p>
                  <a
                    href="#dukung-program"
                    className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
                  >
                    Lihat Program
                  </a>
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
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="dukung-program" className="py-20 bg-yellow-500">
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
              Bantu kami mewujudkan program-program ini dengan menjadi donatur
              atau relawan. Setiap kontribusi Anda sangat berarti.
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
