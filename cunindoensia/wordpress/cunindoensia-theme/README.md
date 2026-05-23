# Cunindoensia Landing Theme

Theme WordPress ini membuat landing page seperti versi Vite/Bolt di repo parent.

## Yang Tersedia

- Landing page di `front-page.php`
- Navbar responsif
- Hero section
- About section dari menu `Cunindoensia`
- Program unggulan dari Custom Post Type `program`
- Program donasi dari Custom Post Type `donation`
- CTA donasi
- Footer dengan profil kontak
- Archive `/program/`
- Archive `/donasi/`
- Archive `/galeri/`
- Halaman berita `/berita/`
- Detail berita `/berita/{slug}/`
- Detail donasi

## Cara Pasang

1. Pastikan plugin `Cunindoensia CMS` aktif.
2. Salin folder `cunindoensia-theme` ke `wp-content/themes/`.
3. Masuk ke WordPress Admin.
4. Buka `Appearance > Themes`.
5. Aktifkan `Cunindoensia Landing`.
6. Buka `Settings > Permalinks`, lalu klik `Save Changes` agar URL CPT aktif.

## Data Yang Dibaca

Theme membaca data dari plugin:

- Option `cunindoensia_dashboard`
- Option `cunindoensia_contact_profile`
- CPT `program`
- CPT `donation`
- CPT `gallery`
- WordPress Post bawaan untuk berita

Untuk berita:

- Judul: post title
- Ringkasan: excerpt
- Konten lengkap: editor WordPress
- Gambar: featured image
- Author: WordPress author
- Kategori: WordPress category
- Featured: meta `Featured?` dari plugin `Cunindoensia CMS`

Jika belum ada data di WordPress, theme tetap tampil dengan gambar dan teks fallback.

## URL Penting

- `/` landing page
- `/program/` daftar program
- `/donasi/` daftar donasi
- `/galeri/` daftar galeri
- `/berita/` daftar berita
- `/berita/{slug}/` detail berita
