import React, { useEffect, useState } from "react";
import { sanity, urlFor } from "../sanityClient";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const [gallery, setGallery] = useState();
  useEffect(() => {
    sanity.fetch(`*[_type == "gallery"]`).then((data) => {
      if (data && data.length > 0) {
        setGallery(data); // Ambil yang pertama
      }
    });
  }, []);

  const images: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/8423302/pexels-photo-8423302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Kegiatan Beasiswa",
      category: "pendidikan",
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/8423425/pexels-photo-8423425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Program Kewirausahaan",
      category: "ekonomi",
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Program Kesehatan",
      category: "kesehatan",
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Perpustakaan Anak",
      category: "pendidikan",
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/9421664/pexels-photo-9421664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Pelatihan Keterampilan",
      category: "ekonomi",
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/8944484/pexels-photo-8944484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Kegiatan Relawan",
      category: "relawan",
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/8849277/pexels-photo-8849277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Kegiatan Sosial",
      category: "sosial",
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/6647118/pexels-photo-6647118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Klinik Kesehatan",
      category: "kesehatan",
    },
    {
      id: 9,
      src: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Beasiswa Anak",
      category: "pendidikan",
    },
    {
      id: 10,
      src: "https://images.pexels.com/photos/8942851/pexels-photo-8942851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Kegiatan Belajar",
      category: "pendidikan",
    },
    {
      id: 11,
      src: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Program Kesehatan Masyarakat",
      category: "kesehatan",
    },
    {
      id: 12,
      src: "https://images.pexels.com/photos/8848952/pexels-photo-8848952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Pelatihan Wirausaha",
      category: "ekonomi",
    },
  ];

  const filteredImages =
    filter === "all"
      ? images
      : images.filter((image) => image.category === filter);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

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
            Galeri Kegiatan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white max-w-3xl mx-auto"
          >
            Dokumentasi berbagai kegiatan dan program Cahaya Untuk Negeri di
            seluruh Indonesia.
          </motion.p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                filter === 'all' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Semua
            </button>
            <button 
              onClick={() => setFilter('pendidikan')}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                filter === 'pendidikan' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Pendidikan
            </button>
            <button 
              onClick={() => setFilter('ekonomi')}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                filter === 'ekonomi' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Ekonomi
            </button>
            <button 
              onClick={() => setFilter('kesehatan')}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                filter === 'kesehatan' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Kesehatan
            </button>
            <button 
              onClick={() => setFilter('relawan')}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                filter === 'relawan' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Relawan
            </button>
            <button 
              onClick={() => setFilter('sosial')}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                filter === 'sosial' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Sosial
            </button>
          </div> */}

          {/* Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery?.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onClick={() => openModal(image)}
              >
                <div className="h-64 overflow-hidden">
                  {image.src && (
                    <img
                      src={urlFor(image.src).url()}
                      alt={image.category}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  )}
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-800 font-medium">{image.category}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
              <div className="relative max-w-4xl w-full">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  <X size={24} />
                </button>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                <div className="mt-4 bg-white p-4 rounded-lg">
                  <p className="text-lg font-medium">{selectedImage.alt}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Tertarik untuk <span className="text-yellow-500">Bergabung?</span>
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Ikuti kegiatan Cahaya Untuk Negeri berikutnya dengan menjadi relawan
            atau donatur. Kami sangat mengapresiasi setiap kontribusi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/kontak"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
            >
              Hubungi Kami
            </a>
            <a
              href="/donasi"
              className="bg-white border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50 px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300"
            >
              Donasi Sekarang
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
