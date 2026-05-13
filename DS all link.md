A.1. Pembaruan UI/UX M-Pajak (lihat Lampiran 1 untuk menu M-Pajak)
Penemuan Produk (Product Discovery)
Riset (Research)
Alur Pengguna dan Arsitektur Informasi Pengguna
Mock-up UI dan Copywriting UX
Pengujian Kegunaan (Usability Testing)

A.2. Implementasi UI/UX
Mengimplementasikan desain hasil kegiatan pembaruan UI/UX ke dalam coding React Native tanpa mengimplementasikan API (menu yang dikembangkan lihat Lampiran 1).
Melakukan demo final untuk tim DGT dengan output berupa berita acara serah terima (BAST).
Melakukan transfer pengetahuan (knowledge transfer) atas hasil pekerjaan untuk menjelaskan komponen desain dan hasil implementasinya kepada tim DGT.
Memastikan platform, media, dan teknologi aplikasi yang digunakan bersifat open source serta tidak memerlukan lisensi bagi DGT untuk mempublikasikan dan mengoperasikan aplikasi.

1. Login
    a. ID Digital
    b. Penyamaran Akun (Impersonate)

2. Dashboard Riwayat Pembayaran dan Status Pajak
3. Profil Wajib Pajak
    a. Profil Saya
    b. Saldo Saat Ini
    c. Daftar Faktur Pajak

4. Pembayaran
    a. Pembayaran Pajak melalui QRIS
    b. Kode Billing Layanan Mandiri
    c. Pembuatan Kode Billing untuk Faktur Pajak
    d. Daftar Kode Billing yang Belum Dibayar

5. Pelaporan
    a. SPT Tahunan Orang Pribadi (sektoral)

6. Pencatatan Sederhana untuk MSMEs

7. Layanan Panggilan
    a. Layanan Panggilan Pajak melalui Voice over Internet Protocol (VOIP)

8. Layanan Pajak
    a. Pengajuan Aplikasi Layanan (untuk layanan tertentu). Layanan akan ditentukan berdasarkan hasil riset, dengan maksimal desain halaman sebanyak 30 halaman.
    b. Pelacakan Proses Penyelesaian Pengajuan Layanan.

9. Verifikasi produk dokumen legal dari DGT (DJP).
10. Peraturan Pajak.

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

Berikut pembagian component
- Button [naufal]
- Label [naufal]
- Assets [naufal]
- Radio Button [naufal]
- Card [hasan]
- Map [hasan]
- Badge [hasan]
- Switch Button [hasan]
- Caraousel [azriel]
- Text Input [azriel]
- Bottom Nav [azriel]
- Bottom Sheet [azriel]
masing2 include dark modenya juga

zoom meeting pro
password sama usernamenya :
    yogi.a@wgs.co.id 
    W4ld3nGl0b4l1o4

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
email support: support_gzpmpk@wgs.co.id 
password google: Rated@super*31
gmeet: https://meet.google.com/ooc-rrje-svf 


Figma                                                                                                                             Prototype
https://www.figma.com/design/VsIfOYq852i6OruR7awGs5/DJP-WGS-X-M-Pajak--INTERNAL-?node-id=1-7&t=6ebCdpYcLTNBCqKE-1                 https://www.figma.com/proto/VsIfOYq852i6OruR7awGs5/DJP-WGS-X-M-Pajak-INTERNAL?node-id=3912-10902&p=f&viewport=-3427%2C143%2C0.32&t=Cw4wokW5ACS1C8HZ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3638%3A1068&page-id=1%3A7

Taiga ticketing
https://scrum.wgs.co.id/project/gzpmpk/kanban

TM.Digital                                                              Figma YUDI: https://www.figma.com/design/TJc1P0LK9rcN8PfoAKWycr/Untitled?node-id=0-1&p=f&t=UmGwA0b21Cdo2BK4-0 
https://beta-tmdigital.stagingapps.net/project/detail/87                email: mulyadiyudi1410@gmail.com && pass: wadukfigma                        
yudi31mulya@gmail.com
pas: super@SU31

RealestNotes Dokumen Dll                                                         UDID IOS 18.6 (IPHONE 11)
https://drive.google.com/drive/u/0/folders/1Zl6RzQEqfV6uva6eZUM15cAvV9lqWtVa     00008030-000C25301421802E

------------------------------------------------------------------------------------------------REPORT

Dear All,
The following is my Daily Report on Wednesday, 13/05/2026
#Update Progress
DS: - 10.02 [In Progress]

#Testing [M-Pajak]
   1. Check Halaman Utama Page base on Figma design
      - Beranda
      - Layanan
      - Aktivitas
      - Profile

   2.  Create Test_case scenario to TM-Digital, fitur Halaman Utama/Beranda
      - Menampilkan banner carousel standar pelayanan
      - Navigasi carousel banner
      - Menampilkan menu shortcut
      - Membuka Aktivasi Akun
      - Membuka Kalender Pajak
      - Membuka Peraturan Perpajakan

   3. Task 
      - #3 QA Update_Test 
        - SplasScreen
        - Login
        - Register
        - Halaman utama

#Problem
      - 

#Documentation
  - Tm.Digital
  - Scrum_Taiga-Sprint_1
  - Realese_Note


                                                                                            Gherkin.feature (gherkin2robotframework "file/A/b/c/login")
                                                                                            login.robot ambil dari file stepDefinition.Resource -> login.resource
                                                                                            login.resource ambil dari file globalKeywoard.resource
                                                                                            globalKeywoard.resource ambil dari variable.resource