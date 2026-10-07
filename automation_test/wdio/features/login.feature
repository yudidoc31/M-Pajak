@mpajak @login
Feature: Login M-Pajak
  Sebagai pengguna M-Pajak
  Saya ingin masuk menggunakan ID Pengguna dan Kata Sandi
  Agar dapat mengakses aplikasi

  Background:
    Given saya berada di halaman login M-Pajak

  @smoke
  Scenario: Memastikan komponen halaman login ditampilkan
    Then kolom ID Pengguna ditampilkan
    And kolom Kata Sandi ditampilkan
    And verifikasi Saya Bukan Robot ditampilkan
    And tombol Masuk ditampilkan

  @validation
  Scenario: Tombol Masuk tidak aktif ketika kredensial belum diisi
    When saya memeriksa tombol Masuk tanpa mengisi kredensial
    Then tombol Masuk tidak aktif

  @login-success
  Scenario: Login dengan kredensial valid
    When saya mengisi ID Pengguna dengan "1333444477778888"
    And saya mengisi Kata Sandi dengan "asbdghfjfjfjf"
    And saya menyelesaikan verifikasi secara manual
    And saya menekan tombol Masuk
    And saya memasukkan PIN dari environment variable
    Then saya berhasil masuk ke halaman setelah login

  @login-negative
  Scenario: Login dengan kredensial tidak valid
    When saya mengisi ID Pengguna dengan "MPAJAK_INVALID_USER"
    And saya mengisi Kata Sandi dengan "MPAJAK_INVALID_PASSWORD"
    And saya menyelesaikan verifikasi secara manual
    And saya menekan tombol Masuk
    Then saya melihat indikasi login gagal
 