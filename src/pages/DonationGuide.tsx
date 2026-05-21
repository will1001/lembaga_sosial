import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  FileText,
  HeartHandshake,
  HelpCircle,
  ReceiptText,
  ShieldCheck,
} from 'lucide-react';
import { paymentMethods } from '../data/paymentMethods';

const donationSteps = [
  {
    title: 'Pilih program donasi',
    body: 'Donatur memilih program sosial yang ingin didukung melalui halaman Donasi. Setiap program menampilkan judul, tujuan, target dana, dana terkumpul, dan informasi waktu program.',
  },
  {
    title: 'Tentukan nominal dalam IDR',
    body: 'Donatur memilih nominal yang tersedia atau memasukkan nominal sendiri. Seluruh nominal ditampilkan dan diproses dalam Rupiah Indonesia (IDR).',
  },
  {
    title: 'Isi data donatur',
    body: 'Donatur mengisi nama, email, nomor WhatsApp/telepon, pesan opsional, serta dapat memilih berdonasi secara anonim.',
  },
  {
    title: 'Pilih metode pembayaran',
    body: 'Donatur memilih metode pembayaran yang tersedia seperti QRIS, GoPay, atau Virtual Account. Minimal nominal mengikuti ketentuan metode pembayaran yang dipilih.',
  },
  {
    title: 'Dialihkan ke Midtrans',
    body: 'Sistem membuat transaksi melalui Midtrans dan mengarahkan donatur ke halaman pembayaran resmi Midtrans untuk menyelesaikan pembayaran.',
  },
  {
    title: 'Selesaikan pembayaran',
    body: 'Donatur membayar sesuai instruksi Midtrans. Status pembayaran diverifikasi otomatis melalui notifikasi/webhook Midtrans.',
  },
  {
    title: 'Donasi tercatat',
    body: 'Setelah pembayaran berhasil, sistem mencatat transaksi sebagai donasi sukses, memperbarui total dana terkumpul, dan menampilkan kontribusi pada program terkait.',
  },
];

const DonationGuide: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 pt-24">
      <section className="bg-gradient-to-r from-amber-600 to-yellow-500 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
              <HeartHandshake size={30} />
            </div>
            <h1 className="text-4xl font-bold md:text-5xl">Cara Berdonasi</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-amber-50">
              Informasi alur donasi end-to-end dari pemilihan program, pengisian data,
              pembayaran melalui Midtrans, sampai donasi tercatat pada program.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-amber-100 bg-white p-6 shadow-sm">
                <ShieldCheck className="mb-4 text-amber-700" size={30} />
                <h2 className="text-lg font-bold text-gray-950">Transaksi Aman</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Pembayaran diproses melalui Midtrans dan status donasi diverifikasi dari
                  notifikasi resmi payment gateway.
                </p>
              </div>
              <div className="rounded-xl border border-amber-100 bg-white p-6 shadow-sm">
                <CreditCard className="mb-4 text-amber-700" size={30} />
                <h2 className="text-lg font-bold text-gray-950">Nominal IDR</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Semua nominal donasi, target, dan ringkasan pembayaran ditampilkan dalam
                  Rupiah Indonesia (IDR).
                </p>
              </div>
              <div className="rounded-xl border border-amber-100 bg-white p-6 shadow-sm">
                <ReceiptText className="mb-4 text-amber-700" size={30} />
                <h2 className="text-lg font-bold text-gray-950">Tercatat Otomatis</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Donasi berhasil akan masuk ke riwayat kontribusi dan menambah total
                  dana terkumpul pada program yang dipilih.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-xl bg-white p-6 shadow-lg md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <FileText className="text-amber-700" size={26} />
                <div>
                  <h2 className="text-2xl font-bold text-gray-950">Alur End-to-End Donasi</h2>
                  <p className="text-sm text-gray-600">
                    Urutan proses yang dilalui donatur dari awal sampai pembayaran terkonfirmasi.
                  </p>
                </div>
              </div>

              <ol className="space-y-4">
                {donationSteps.map((step, index) => (
                  <li key={step.title} className="grid gap-4 rounded-lg border border-gray-100 p-4 md:grid-cols-[48px_1fr]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-600 text-lg font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-950">{step.title}</h3>
                      <p className="mt-1 leading-relaxed text-gray-700">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <section className="rounded-xl bg-white p-6 shadow-lg md:p-8">
                <h2 className="text-2xl font-bold text-gray-950">Nominal dan Metode Pembayaran</h2>
                <p className="mt-2 text-gray-700">
                  Donasi tersedia mulai dari nominal minimum sesuai metode pembayaran.
                  Donatur akan melihat ringkasan nominal dalam IDR sebelum melanjutkan pembayaran.
                </p>

                <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-3 font-bold">Metode</th>
                        <th className="px-4 py-3 font-bold">Minimal</th>
                        <th className="px-4 py-3 font-bold">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {paymentMethods.map((method) => (
                        <tr key={method.id}>
                          <td className="px-4 py-3 font-semibold text-gray-950">{method.name}</td>
                          <td className="px-4 py-3 text-amber-700">{formatCurrency(method.minAmount)}</td>
                          <td className="px-4 py-3 text-gray-600">{method.accountNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <aside className="rounded-xl border border-amber-100 bg-amber-50 p-6 md:p-8">
                <HelpCircle className="mb-4 text-amber-700" size={30} />
                <h2 className="text-2xl font-bold text-gray-950">Bantuan Transaksi</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  Jika pembayaran berhasil tetapi status belum berubah, donatur dapat menghubungi
                  kontak resmi dengan menyertakan ID transaksi, nama, email, nomor telepon,
                  nominal donasi, metode pembayaran, dan bukti pembayaran.
                </p>
                <div className="mt-5 rounded-lg bg-white p-4 text-sm text-gray-700">
                  <p className="font-bold text-gray-950">Kontak resmi</p>
                  <p className="mt-1">Email: yayasancahayauntuknegri@gmail.com</p>
                  <p>WhatsApp: +62 878-8770-5166</p>
                </div>
                <Link
                  to="/donasi"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-3 font-bold text-white transition hover:bg-amber-700"
                >
                  Pilih Program Donasi
                  <ArrowRight size={18} />
                </Link>
              </aside>
            </div>

            <div className="mt-10 rounded-xl border border-green-100 bg-green-50 p-6">
              <div className="flex gap-3">
                <CheckCircle className="mt-1 shrink-0 text-green-700" size={22} />
                <p className="text-sm leading-relaxed text-green-800">
                  Dana donasi digunakan untuk tujuan program yang dipilih donatur. Informasi
                  detail tujuan, target dana, dan perkembangan program dapat dilihat pada
                  masing-masing halaman detail program donasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationGuide;
