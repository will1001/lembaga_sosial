import React from 'react';
import { motion } from 'framer-motion';

type LegalPageProps = {
  type: 'terms' | 'privacy' | 'refund';
};

const content = {
  terms: {
    title: 'Syarat dan Ketentuan',
    intro: 'Syarat ini mengatur penggunaan layanan donasi Cahaya Untuk Negeri.',
    sections: [
      {
        title: 'Layanan Donasi',
        body: 'Website ini menyediakan informasi program sosial dan fasilitas donasi untuk mendukung program yang dipilih donatur.',
      },
      {
        title: 'Nominal dan Mata Uang',
        body: 'Seluruh transaksi donasi menggunakan mata uang Rupiah (IDR). Donatur wajib memastikan nominal donasi sudah benar sebelum melanjutkan pembayaran.',
      },
      {
        title: 'Metode Pembayaran',
        body: 'Metode pembayaran dapat meliputi QRIS, e-wallet, virtual account, dan transfer bank sesuai ketersediaan pada halaman checkout.',
      },
      {
        title: 'Penyaluran Dana',
        body: 'Dana donasi akan digunakan untuk program yang dipilih dan/atau kebutuhan operasional penyaluran yang relevan dengan program tersebut.',
      },
      {
        title: 'Perubahan Program',
        body: 'Apabila program selesai, berubah, atau tidak dapat dilaksanakan karena kondisi tertentu, pengelola dapat mengalihkan dana ke program sosial lain yang sejenis.',
      },
    ],
  },
  privacy: {
    title: 'Kebijakan Privasi',
    intro: 'Kebijakan ini menjelaskan bagaimana data donatur dikumpulkan dan digunakan.',
    sections: [
      {
        title: 'Data yang Dikumpulkan',
        body: 'Kami dapat mengumpulkan nama, email, nomor telepon, nominal donasi, pesan, pilihan anonim, metode pembayaran, dan status transaksi.',
      },
      {
        title: 'Penggunaan Data',
        body: 'Data digunakan untuk memproses donasi, mengirim informasi transaksi, melakukan rekonsiliasi pembayaran, dan menyampaikan laporan program.',
      },
      {
        title: 'Keamanan Data',
        body: 'Kami menerapkan pembatasan akses internal dan menggunakan layanan pembayaran yang mendukung proses transaksi aman.',
      },
      {
        title: 'Pembagian Data',
        body: 'Data transaksi dapat dibagikan kepada penyedia payment gateway hanya sejauh diperlukan untuk memproses pembayaran.',
      },
      {
        title: 'Kontak Privasi',
        body: 'Permintaan koreksi atau penghapusan data dapat dikirim melalui halaman kontak resmi.',
      },
    ],
  },
  refund: {
    title: 'Kebijakan Pengembalian Dana',
    intro: 'Kebijakan ini menjelaskan kondisi pengembalian dana donasi.',
    sections: [
      {
        title: 'Donasi Berhasil',
        body: 'Donasi yang sudah berhasil dan tercatat pada sistem pada prinsipnya tidak dapat dibatalkan karena dana diproses untuk penyaluran program.',
      },
      {
        title: 'Kondisi Pengembalian',
        body: 'Pengembalian dana dapat dipertimbangkan jika terjadi pembayaran ganda, nominal tidak sesuai akibat gangguan sistem, atau transaksi tidak sah yang dapat dibuktikan.',
      },
      {
        title: 'Proses Pengajuan',
        body: 'Donatur dapat menghubungi kontak resmi dengan menyertakan ID transaksi, bukti pembayaran, nama, email, nomor telepon, dan alasan pengajuan.',
      },
      {
        title: 'Waktu Pemeriksaan',
        body: 'Pengajuan akan diperiksa maksimal 7 hari kerja. Jika disetujui, pengembalian mengikuti jadwal dan ketentuan bank atau payment gateway.',
      },
      {
        title: 'Biaya Transaksi',
        body: 'Biaya payment gateway, bank, atau administrasi yang sudah terjadi dapat mengurangi nominal pengembalian sesuai ketentuan penyedia layanan.',
      },
    ],
  },
};

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const page = content[type];

  return (
    <div className="pt-24 bg-gradient-to-b from-white to-amber-50 min-h-screen">
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {page.title}
          </motion.h1>
          <p className="text-lg text-white max-w-3xl mx-auto">{page.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
            <p className="text-sm text-gray-500 mb-8">
              Terakhir diperbarui: 17 Mei 2026
            </p>
            <div className="space-y-8">
              {page.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h2>
                  <p className="text-gray-700 leading-relaxed">{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
