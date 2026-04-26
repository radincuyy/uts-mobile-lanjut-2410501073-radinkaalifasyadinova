Mata Kuliah: Pemrograman Mobile Lanjut
Waktu Pengerjaan: 7 Hari - Asynchronous, Perorangan
Periode UTS: Rabu, 22 April 2026 - Rabu, 29 April 2026
Program Studi: D-3 Sistem Informasi
Semester: 4
Dosen: Muhammad Panji Muslim, S.Pd., M.Kom. , Ruth Mariana Bunga Wadu, S.Kom., MMSI
Sifat Ujian: Open Buku (Internet) - TANPA AI
Submisi: Repository GitHub (Publik) + Link di LeAds

SOAL UJIAN TENGAH SEMESTER GENAP TA.
2025/2026
PEMROGRAMAN MOBILE LANJUT
Perhatian:

1. Pengerjaan perorangan. Diskusi konsep antar teman diperbolehkan, tetapi kode TIDAK BOLEH di-share atau disalin dari mahasiswa lain.
2. Source code WAJIB dipush ke GitHub publik secara bertahap (minimal 5 commit dengan timestamp yang tersebar - bukan 1 commit besar di akhir). Commit history yang tidak wajar (semua dipush di H-1) akan masuk shortlist viva.
3. Tulis NIM dan Nama di dalam aplikasi (wajib muncul di screen "About" atau footer) DAN di README.md repository.
4. DILARANG menggunakan Artificial Intelligence Robot (ChatGPT, Claude, Copilot, Gemini, DeepSeek, Cursor, v0, Bolt, Lovable, atau sejenisnya) untuk menulis, melengkapi, atau men-generate kode. Boleh untuk mencari referensi konsep saja, bukan output kode.
5. Submisi dicek menggunakan 3 layer verifikasi: (a) JPlag untuk similarity antar mahasiswa dan terhadap sampel AI-generated, (b) analisis Git commit history.
6. Deadline ketat. Keterlambatan = potongan nilai progresif (lihat Bagian E). Push commit setelah deadline = dihitung terlambat.
7. Referensi diperbolehkan dari dokumentasi resmi (reactnative.dev, docs.expo.dev, reactnavigation.org), Stack Overflow, blog teknis, atau video tutorial - dengan syarat WAJIB mencantumkan sumber di comment code atau di README (section "Referensi").

A. DESKRIPSI PROYEK (Total bobot nilai = 100%)
Judul: Mini Catalog App - React Native + Expo
Buat aplikasi mobile cross-platform (React Native + Expo) berupa "katalog" sederhana yang mengambil data dari API publik, dengan fitur navigasi antar screen, state management untuk favorit, dan form pencarian. Aplikasi wajib berjalan di Expo Go (Android/iOS) tanpa error.

B. PILIHAN TEMA (wajib pilih SATU)
Tiga pilihan tema di bawah. Pilih salah satu dan kerjakan sesuai requirement teknis di Bagian C. Tuliskan pilihan tema kamu di README.md.

Tema A: ResepKita - Katalog Resep Kuliner API: https://www.themealdb.com/api.php
Fitur wajib:
Home: daftar kategori makanan (endpoint/categories.php).
Browse: daftar resep per kategori (endpoint/filter.php?c=<kategori>).
Detail: detail resep - nama, gambar, bahan, instruksi (endpoint/lookup.php?i=<id>).
Favorit: simpan resep favorit di state management (contoh: Context API atau Zustand).
Search: cari resep by nama (endpoint/search.php?s=<keyword>).

Tema B: MovieDex - Katalog Film & Series API: https://api.tvmaze.com/
Fitur wajib:
Home: daftar show populer (endpoint/shows).
Browse: daftar per genre (filter hasil dari /shows).
Detail: detail show - poster, summary, rating, genre, schedule (endpoint/shows/<id>).
Favorit: simpan show favorit di state management.
Search: cari show by judul (endpoint/search/shows?q=<keyword>).

Tema C: BookShelf - Katalog Buku API: https://openlibrary.org/developers/api
Fitur wajib:
Home: daftar subject populer atau trending books (endpoint/subjects.json atau /trending/daily.json).
Browse: daftar buku per subject (endpoint/subjects/<subject>.json).
Detail: detail buku - judul, author, cover, deskripsi, tahun terbit (endpoint/works/<id>.json).
Favorit: simpan buku favorit di state management.
Search: cari buku by judul/author (endpoint/search.json?q=<keyword>).

Aturan pemilihan tema: Tema dipilih dengan rumus (NIM digit terakhir) untuk mencegah semua mahasiswa pilih tema yang sama. Mapping digit-terakhir-NIM ke tema:
0/3/6/9: Tema A (ResepKita)
1/4/7: Tema B (MovieDex)
2/5/8: Tema C (BookShelf)
NIM Saya Radinka Alifasya Dinova: 2410501073

C. REQUIREMENT TEKNIS (wajib untuk semua tema)
C.1. Screen Minimum (CPMK 1 - Memahami dan menerapkan konsep React Native dan Expo untuk pengembangan aplikasi mobile cross-platform)
Aplikasi harus memiliki minimal 5 screen berikut:

1. Homescreen - Landing screen, tampilkan daftar data utama dari API (grid/list). Wajib ada loading indicator saat fetch, dan error handling saat fetch gagal.
2. DetailScreen - Detail dari item yang diklik di Home. Gunakan navigation params untuk mengirim ID item. Minimal tampilkan 5 field data + tombol "Tambah ke Favorit".
3. FavoritesScreen - Daftar item yang telah ditambahkan ke favorit. State harus persist selama app berjalan (boleh hilang saat restart, AsyncStorage belum wajib). Wajib ada tombol "Hapus dari Favorit".
4. SearchScreen - Form input untuk search query + tombol submit. Tampilkan hasil pencarian dalam bentuk list. Wajib client-side validation (minimal 3 karakter, tidak boleh kosong).
5. AboutScreen - Profil pengerjaan: Nama, NIM, Kelas, Tema yang dipilih, Foto profil (boleh avatar statis), dan credit API yang digunakan.

C.2. Navigation (CPMK 2 - Mengimplementasikan navigasi kompleks dan state management dalam aplikasi mobile) Wajib menggunakan React Navigation dengan kombinasi:
• Stack Navigator untuk flow Home → Detail.
• Bottom Tab Navigator untuk navigasi utama (Home, Favorit, Search, About).
• Gunakan navigation params untuk passing data antar screen (wajib).

C.3. State Management (CPMK 2 - Mengimplementasikan navigasi kompleks dan state management dalam aplikasi mobile) Wajib menggunakan SALAH SATU dari berikut untuk mengelola state favorit:
• Context API + useReducer (hasil dari Minggu 4).
• Redux Toolkit (hasil dari Minggu 5).
• Zustand (hasil dari Minggu 5).

Wajib tulis justifikasi pemilihan state management di README.md - kenapa kamu pilih opsi itu, apa kelebihan/kekurangannya untuk kasus ini.

C.4. API Integration (CPMK3 - Mengintegrasikan API eksternal (data fetching) dalam aplikasi mobile → bagian fetching)

- Gunakan fetch() native atau library axios.
- Wajib ada loading state (misalnya ActivityIndicator) saat menunggu response.
- Wajib ada error handling - tampilkan pesan "Gagal memuat data" jika request error atau network down.
- Wajib implement pull-to-refresh di Home atau salah satu list screen.

C.5. Forms & Input (CPMK 2)

- Form search wajib pakai controlled component (useState).
- Validation client-side minimal: input tidak boleh kosong dan minimum 3 karakter.
- Tampilkan pesan error di bawah input jika validasi gagal.

C.6. Tech Stack Wajib
Framework: React Native + Expo SDK (versi terbaru stable)
Bahasa: JavaScript ATAU TypeScript (bebas pilih)
Navigation: @react-navigation/native + stack + bottom-tabs
HTTP Client: fetch API / axios
State Mgmt: Context API ATAU Redux Toolkit ATAU Zustand
Package Mgr: npm atau yarn
Testing: Expo Go (Android/iOS) WAJIB bisa dijalankan

D. DELIVERABLE (wajib semua)
D.1. GitHub Repository
• Nama repository, uts-mobile-lanjut-<NIM>-<Nama> (contoh: uts-mobile-lanjut2110512001-BelaNegara). Gunakan huruf kecil dan dash untuk separator.
• Visibility, Public. Jika private, dosen tidak bisa akses = dianggap tidak submit.
• Minimal commit adalah 5 commit dengan message yang deskriptif (bukan "update", "fix",
"final"). Contoh yang baik: "feat: add HomeScreen with categories fetch", "fix: handle empty
search result".
• Commit timestamp, Harus tersebar minimal di 3 hari berbeda dalam periode UTS. Semua
commit di H-1 deadline = otomatis masuk shortlist viva.
• .gitignore, Wajib di-setup dengan benar (node_modules/, .expo/, \*.log, dll). Commit
node_modules = -5% otomatis.

D.2. README.md
Minimal berisi section berikut:
• Judul project + Nama, NIM, Kelas.
• Tema yang dipilih (A/B/C).
• Tech stack yang digunakan + versi (dari package.json).
• Cara install & run (clone, npm install, npx expo start).
• Screenshot semua screen minimum 5 gambar (PNG/JPG, di folder /screenshots).
• Link video demo (YouTube unlisted / Google Drive).
• Penjelasan state management yang dipilih + justifikasi.
• Daftar referensi (tutorial, dokumentasi, Stack Overflow link yang kamu pakai).
• Refleksi pengerjaan (minimal 150 kata): kesulitan, bug yang pernah muncul, dan apa yang
dipelajari.

D.3. Video Demo
• Durasi 3–5 menit.
• Wajib perlihatkan semua 5 screen (Home, Detail, Favorit, Search, About).
• Wajib perlihatkan pull-to-refresh dan error handling (contoh: matikan internet, lihat apa yang
terjadi).
• Wajib narasi suara kamu sendiri menjelaskan apa yang sedang dilakukan (tidak boleh bisu /
musik saja).
• Upload ke YouTube (unlisted), Google Drive (link public).
• Link disematkan di README.md section "Video Demo".

E. TIMELINE & DEADLINE
Rekomendasi pengerjaan per hari (bukan paksaan - sekadar pacing guide):

| Hari       | Milestone                                               | Output di GitHub                               |
| ---------- | ------------------------------------------------------- | ---------------------------------------------- |
| **Hari 1** | Setup project Expo + pilih tema + commit pertama        | feat: initial expo project setup               |
| **Hari 2** | Setup navigation (Stack + Bottom Tab) + struktur folder | feat: setup react navigation structure         |
| **Hari 3** | HomeScreen + API fetch + loading/error state            | feat: implement HomeScreen with API            |
| **Hari 4** | DetailScreen + navigation params                        | feat: implement DetailScreen with params       |
| **Hari 5** | State management + FavoritesScreen                      | feat: add favorites with Context/Redux/Zustand |
| **Hari 6** | SearchScreen + form validation + AboutScreen            | feat: search with validation, about page       |
| **Hari 7** | Polishing, screenshot, video, README, final push        | docs: final README + screenshots               |

Deadline: Rabu, 29 April 2026 pukul 23:59 WIB. Commit/push setelah jam ini dihitung sebagai
keterlambatan.
Penalti keterlambatan:
• 1 - 24 jam terlambat: potongan 10% dari nilai akhir.
• 25 - 48 jam terlambat: potongan 30% dari nilai akhir.
• 49 - 72 jam terlambat: potongan 50% dari nilai akhir.
• Lebih dari 72 jam: tidak diterima, nilai 0.
