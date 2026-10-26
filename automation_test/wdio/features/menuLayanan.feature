Feature: Navigasi menu Layanan

  @NavMenu-Layanan
  Scenario: Membuka halaman Layanan dari beranda
    Given saya telah membuka aplikasi M-Pajak
    When saya mengisi ID Pengguna dengan "MPAJAK_USER_ID"
    And saya mengisi Kata Sandi dengan "MPAJAK_PASSWORD"
    And saya menyelesaikan verifikasi secara manual
    And saya menekan tombol Masuk
    And saya memasukkan PIN dari environment variable
    And saya menekan tombol skip tutorial
    Then saya berada di halaman beranda
    When saya menekan menu Layanan
    Then saya diarahkan ke halaman Layanan
