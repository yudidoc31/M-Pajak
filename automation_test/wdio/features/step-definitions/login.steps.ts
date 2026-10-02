declare const expect: any;

import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../../src/pages/login.page';

Given('saya berada di halaman login M-Pajak', async () => {
    // Diasumsikan aplikasi sudah dibuka dan sedang berada di halaman login.
    // Jika test dimulai dari halaman utama, aktifkan aksi navigasi yang sesuai
    // setelah selector tombol masuk utama dikonfirmasi dengan Appium Inspector.
    await LoginPage.waitForLoginPage();
});

Then('kolom ID Pengguna ditampilkan', async () => {
    await expect(LoginPage.userIdInput).toBeDisplayed();
});

Then('kolom Kata Sandi ditampilkan', async () => {
    await expect(LoginPage.passwordInput).toBeDisplayed();
});

Then('verifikasi Saya Bukan Robot ditampilkan', async () => {
    await expect(LoginPage.captchaArea).toBeDisplayed();
});

Then('tombol Masuk ditampilkan', async () => {
    await expect(LoginPage.loginButton).toBeDisplayed();
});

When('saya memeriksa tombol Masuk tanpa mengisi kredensial', async () => {
    // Tidak mengisi kolom dan tidak mencoba melewati CAPTCHA.
});

Then('tombol Masuk tidak aktif', async () => {
    await expect(LoginPage.loginButton).toBeDisabled();
});

When('saya mengisi ID Pengguna dengan {string}', async (userId: string) => {
    const value = process.env[userId];
    if (!value) {
        throw new Error(`Environment variable ${userId} belum diisi.`);
    }
    await LoginPage.enterUserId(value);
});

When('saya mengisi Kata Sandi dengan {string}', async (passwordKey: string) => {
    const value = process.env[passwordKey];
    if (!value) {
        throw new Error(`Environment variable ${passwordKey} belum diisi.`);
    }
    await LoginPage.enterPassword(value);
});

When('saya menyelesaikan verifikasi secara manual', async () => {
    // CAPTCHA harus diselesaikan oleh tester pada emulator.
    // Test menunggu tombol aktif; tidak mengklik atau mem-bypass CAPTCHA.
    await LoginPage.waitUntilLoginEnabled(120000);
});

When('saya menekan tombol Masuk', async () => {
    await LoginPage.submit();
});

Then('saya berhasil masuk ke halaman setelah login', async () => {
    await LoginPage.waitForLoginResult();
    await expect(LoginPage.postLoginMarker).toBeDisplayed();
});

Then('saya melihat indikasi login gagal', async () => {
    await LoginPage.waitForLoginError();
    await expect(LoginPage.loginError).toBeDisplayed();
});
