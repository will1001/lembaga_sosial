import React from 'react';
import { motion } from 'framer-motion';

type LegalPageProps = {
  type: 'terms' | 'privacy' | 'refund';
};

const organization = {
  name: 'Yayasan Cahaya Untuk Negeri',
  legalName: 'YAYASAN CAHAYA UNTUK NEGERI',
  website: 'https://www.cunindonesia.org/',
  email: 'yayasancahayauntuknegri@gmail.com',
  phone: '+62 878-8770-5166',
  address: 'Dasan Reban, Desa Bagik Payung Selatan, Kecamatan Suralaga, Kabupaten Lombok Timur, Nusa Tenggara Barat',
};

const content = {
  terms: {
    title: 'Syarat dan Ketentuan',
    intro: `Syarat ini mengatur penggunaan website dan layanan donasi ${organization.name}.`,
    sections: [
      {
        title: 'Identitas Pengelola',
        body: `${organization.name} dikelola oleh ${organization.legalName} yang beralamat di ${organization.address}. Website resmi lembaga adalah ${organization.website}.`,
      },
      {
        title: 'Layanan Donasi dan Program Sosial',
        body: `${organization.name} menyediakan informasi kegiatan sosial, program bantuan, dan fasilitas donasi untuk mendukung program yang dipilih donatur melalui website resmi.`,
      },
      {
        title: 'Nominal dan Mata Uang',
        body: 'Seluruh transaksi donasi menggunakan mata uang Rupiah (IDR). Donatur wajib memastikan nominal donasi sudah benar sebelum melanjutkan pembayaran.',
      },
      {
        title: 'Metode Pembayaran',
        body: 'Metode pembayaran dapat meliputi QRIS, e-wallet, virtual account, transfer bank, dan metode lain yang tersedia melalui penyedia payment gateway pada halaman checkout.',
      },
      {
        title: 'Penyaluran Dana',
        body: 'Dana donasi akan digunakan untuk program yang dipilih dan/atau kebutuhan operasional penyaluran yang relevan dengan pelaksanaan program sosial tersebut.',
      },
      {
        title: 'Perubahan Program',
        body: 'Apabila program selesai, berubah, atau tidak dapat dilaksanakan karena kondisi tertentu, pengelola dapat mengalihkan dana ke program sosial lain yang sejenis.',
      },
      {
        title: 'Kontak Resmi',
        body: `Pertanyaan terkait program, transaksi, atau layanan donasi dapat dikirim ke email ${organization.email} atau nomor kontak ${organization.phone}.`,
      },
    ],
  },
  privacy: {
    title: 'Kebijakan Privasi',
    intro: `Kebijakan ini menjelaskan bagaimana ${organization.name} mengumpulkan dan menggunakan data donatur.`,
    sections: [
      {
        title: 'Pengelola Data',
        body: `Data donatur pada website ini dikelola oleh ${organization.name}, beralamat di ${organization.address}.`,
      },
      {
        title: 'Data yang Dikumpulkan',
        body: 'Kami dapat mengumpulkan nama, email, nomor telepon, nominal donasi, pesan donatur, pilihan anonim, metode pembayaran, ID transaksi, dan status transaksi.',
      },
      {
        title: 'Penggunaan Data',
        body: 'Data digunakan untuk memproses donasi, mengirim informasi transaksi, melakukan rekonsiliasi pembayaran, dan menyampaikan laporan program.',
      },
      {
        title: 'Keamanan Data',
        body: 'Kami menerapkan pembatasan akses internal dan menggunakan layanan pembayaran pihak ketiga yang mendukung proses transaksi aman.',
      },
      {
        title: 'Pembagian Data',
        body: 'Data transaksi dapat dibagikan kepada penyedia payment gateway hanya sejauh diperlukan untuk memproses pembayaran.',
      },
      {
        title: 'Kontak Privasi',
        body: `Permintaan koreksi, pembaruan, atau penghapusan data dapat dikirim ke ${organization.email} atau ${organization.phone}.`,
      },
    ],
  },
  refund: {
    title: 'Kebijakan Pengembalian Dana',
    intro: `Kebijakan ini menjelaskan aturan pengembalian dana donasi pada ${organization.name}.`,
    sections: [
      {
        title: 'Ketentuan Final Donasi',
        body: 'Donasi yang sudah berhasil dibayarkan dan tercatat pada sistem bersifat final serta tidak dapat dibatalkan secara sepihak karena dana diproses untuk penyaluran program sosial.',
      },
      {
        title: 'Pengecualian Pengembalian Dana',
        body: 'Pengembalian dana hanya dapat dipertimbangkan apabila terjadi pembayaran ganda, nominal tidak sesuai akibat gangguan sistem, transaksi berhasil tetapi tidak tercatat, atau transaksi tidak sah yang dapat dibuktikan.',
      },
      {
        title: 'Proses Pengajuan',
        body: `Donatur dapat mengajukan pemeriksaan melalui ${organization.email} atau ${organization.phone} dengan menyertakan ID transaksi, bukti pembayaran, nama, email, nomor telepon, nominal, tanggal transaksi, dan alasan pengajuan.`,
      },
      {
        title: 'Batas Waktu Pengajuan',
        body: 'Pengajuan pengembalian dana wajib dikirim maksimal 3 hari kalender sejak tanggal transaksi. Pengajuan di luar batas waktu tersebut dapat ditolak.',
      },
      {
        title: 'Waktu Pemeriksaan dan Pencairan',
        body: 'Pengajuan akan diperiksa maksimal 7 hari kerja. Jika disetujui, proses pengembalian mengikuti jadwal dan ketentuan bank, e-wallet, atau payment gateway yang digunakan.',
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
            <div className="mb-10 rounded-lg border border-amber-100 bg-amber-50 p-5">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Lembaga</h2>
              <dl className="grid gap-3 text-sm md:grid-cols-[180px_1fr]">
                <dt className="font-semibold text-gray-700">Nama lembaga</dt>
                <dd className="text-gray-800">{organization.name}</dd>
                <dt className="font-semibold text-gray-700">Nama legal</dt>
                <dd className="text-gray-800">{organization.legalName}</dd>
                <dt className="font-semibold text-gray-700">Alamat</dt>
                <dd className="text-gray-800">{organization.address}</dd>
                <dt className="font-semibold text-gray-700">Email</dt>
                <dd className="text-gray-800">{organization.email}</dd>
                <dt className="font-semibold text-gray-700">Nomor kontak</dt>
                <dd className="text-gray-800">{organization.phone}</dd>
                <dt className="font-semibold text-gray-700">Website</dt>
                <dd className="text-gray-800">{organization.website}</dd>
              </dl>
            </div>
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
