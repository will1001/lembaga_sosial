import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message?: string;
  }>({
    status: 'idle',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ status: 'submitting' });

    // Simulating form submission delay
    setTimeout(() => {
      setSubmitStatus({
        status: 'success',
        message: 'Pesan Anda telah terkirim! Kami akan segera menghubungi Anda kembali.',
      });
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
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
            Hubungi Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white max-w-3xl mx-auto"
          >
            Kami senang mendengar dari Anda. Silakan hubungi kami untuk informasi lebih lanjut atau kerjasama.
          </motion.p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/3"
            >
              <h2 className="text-3xl font-bold mb-6">Informasi <span className="text-yellow-500">Kontak</span></h2>
              <p className="text-gray-700 mb-8">
                Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan, ingin menjadi relawan, atau berdonasi. 
                Tim kami siap membantu Anda.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 p-3 rounded-full flex-shrink-0">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Alamat Kantor</h3>
                    <p className="text-gray-700">
                      Jl. Harapan Baru No. 123<br />
                      Jakarta Selatan, DKI Jakarta 12345<br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 p-3 rounded-full flex-shrink-0">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Telepon</h3>
                    <p className="text-gray-700">
                      +62 812 3456 7890 (Umum)<br />
                      +62 878 9012 3456 (Donasi)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 p-3 rounded-full flex-shrink-0">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-700">
                      info@cahayauntuknegeri.org<br />
                      donasi@cahayauntuknegeri.org
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-bold text-gray-800 mb-3">Jam Operasional</h3>
                <div className="text-gray-700 space-y-1">
                  <p>Senin - Jumat: 08.00 - 17.00 WIB</p>
                  <p>Sabtu: 09.00 - 14.00 WIB</p>
                  <p>Minggu: Tutup</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-2/3"
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Kirim Pesan Kepada Kami</h2>

                {submitStatus.status === 'success' ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                    {submitStatus.message}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subjek</label>
                      <select 
                        id="subject" 
                        name="subject" 
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      >
                        <option value="">Pilih Subjek</option>
                        <option value="Informasi Umum">Informasi Umum</option>
                        <option value="Donasi">Donasi</option>
                        <option value="Relawan">Menjadi Relawan</option>
                        <option value="Kerjasama">Kerjasama</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Pesan</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formState.message}
                        onChange={handleChange}
                        rows={5} 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
                      disabled={submitStatus.status === 'submitting'}
                    >
                      {submitStatus.status === 'submitting' ? (
                        <span>Mengirim...</span>
                      ) : (
                        <>
                          <Send size={18} className="mr-2" /> Kirim Pesan
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Pertanyaan <span className="text-yellow-500">Umum</span></h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Beberapa jawaban untuk pertanyaan yang sering diajukan tentang Cahaya Untuk Negeri.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Bagaimana cara saya berdonasi?</h3>
                <p className="text-gray-700">
                  Anda dapat berdonasi melalui transfer bank, e-wallet, atau melalui tombol "Donasi" di situs kami. 
                  Setiap donasi akan mendapatkan tanda terima resmi dan laporan penggunaan dana secara berkala.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Bagaimana cara menjadi relawan?</h3>
                <p className="text-gray-700">
                  Anda dapat mendaftar sebagai relawan melalui formulir di halaman "Kontak" atau menghubungi kami langsung. 
                  Kami akan mengarahkan Anda ke program yang sesuai dengan minat dan keahlian Anda.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Apakah saya bisa mengusulkan program?</h3>
                <p className="text-gray-700">
                  Tentu! Kami terbuka untuk kolaborasi dan ide-ide baru. Silakan hubungi kami dengan detail proposal program Anda, 
                  dan tim kami akan mengkaji kemungkinan implementasinya.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-3">Bagaimana transparansi penggunaan dana?</h3>
                <p className="text-gray-700">
                  Kami berkomitmen pada transparansi penuh. Semua donatur akan menerima laporan penggunaan dana secara berkala. 
                  Kami juga mempublikasikan laporan tahunan yang dapat diakses oleh publik.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Lokasi <span className="text-yellow-500">Kami</span></h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Kunjungi kantor kami di Jakarta untuk berbicara langsung dengan tim kami.
          </p>
        </div>
        
        <div className="aspect-w-16 aspect-h-9 h-[500px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.30301356788!2d106.7229201158203!3d-6.229386199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14d30079f01%3A0x2e74f2341fff266d!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1593000593979!5m2!1sid!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Lokasi Kantor Cahaya Untuk Negeri"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;