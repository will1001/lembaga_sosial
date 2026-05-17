# Cunindoensia CMS for WordPress

Plugin ini adalah versi WordPress dari schema Sanity di repo ini. Tujuannya menyediakan struktur admin WordPress yang setara dengan CMS lama, bukan memigrasikan data otomatis.

Untuk tampilan landing page, gunakan theme `wordpress/cunindoensia-theme`.

## Cara Pasang

1. Salin folder `cunindoensia-cms` ke `wp-content/plugins/`.
2. Masuk ke WordPress Admin.
3. Buka `Plugins`.
4. Aktifkan `Cunindoensia CMS`.
5. Buka menu `Cunindoensia` untuk mengisi konten beranda dan profil kontak.

## Mapping Dari Sanity

| Sanity schema | WordPress |
| --- | --- |
| `program` | Custom Post Type `program` |
| `donation` | Custom Post Type `donation` |
| `donation_record` | Custom Post Type `donation_record` |
| `gallery` | Custom Post Type `gallery` |
| `post` | WordPress Post bawaan |
| `dashboard` | Menu settings `Cunindoensia` |
| `contact_profile` | Menu settings `Cunindoensia` |

## Field Penting

### Program

- Judul: post title
- Deskripsi: editor atau excerpt
- Gambar: featured image
- Kategori: taxonomy `program_category`
- Featured: meta `_cun_program_featured`

### Donasi

- Judul program: post title
- Slug: WordPress slug
- Deskripsi singkat: excerpt
- Konten lengkap: editor
- Gambar: featured image
- Target donasi: `_cun_donation_target_amount`
- Jumlah terkumpul: `_cun_donation_current_amount`
- Jumlah donatur: `_cun_donation_donors_count`
- Kategori: `_cun_donation_category`
- Aktif: `_cun_donation_is_active`
- Tanggal mulai: `_cun_donation_start_date`
- Tanggal selesai: `_cun_donation_end_date`
- Unggulan: `_cun_donation_featured`

### Riwayat Donasi

- Program donasi: `_cun_record_donation_program`
- Nama donatur: `_cun_record_donor_name`
- Email donatur: `_cun_record_donor_email`
- Telepon donatur: `_cun_record_donor_phone`
- Jumlah donasi: `_cun_record_amount`
- Pesan: `_cun_record_message`
- Metode pembayaran: `_cun_record_payment_method`
- Status pembayaran: `_cun_record_payment_status`
- Anonymous: `_cun_record_is_anonymous`
- Tanggal donasi: `_cun_record_created_at`

### Gallery

- Gambar: featured image
- Kategori: taxonomy `gallery_category`

## REST API

Plugin ini mengaktifkan `show_in_rest`, jadi data bisa diambil dari:

- `/wp-json/wp/v2/program`
- `/wp-json/wp/v2/donation`
- `/wp-json/wp/v2/donation_record`
- `/wp-json/wp/v2/gallery`

Meta field menggunakan prefix `_cun_` dan tersedia di REST API untuk user yang punya izin edit. Untuk frontend publik, biasanya data meta ditampilkan lewat template theme atau endpoint custom sesuai kebutuhan.

## Catatan Migrasi Data

Plugin ini belum mengambil data dari Sanity secara otomatis. Kalau data lama sudah ada di Sanity, langkah berikutnya adalah membuat script migrasi yang:

1. Export data Sanity.
2. Upload aset gambar ke WordPress Media Library.
3. Buat post sesuai Custom Post Type.
4. Isi meta field dengan data dari schema lama.
