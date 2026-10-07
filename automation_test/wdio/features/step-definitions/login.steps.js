const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../../src/pages/login.page.js');

Given('saya berada di halaman login M-Pajak', async () => {
    await LoginPage.ensureLoginPageOpen();
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

When('saya mengisi ID Pengguna dengan {string}', async (userId) => {
    const value = process.env[userId] || userId;
    await LoginPage.enterUserId(value);
});

When('saya mengisi Kata Sandi dengan {string}', async (passwordKey) => {
    const value = process.env[passwordKey] || passwordKey;
    await LoginPage.enterPassword(value);
});

When('saya menyelesaikan verifikasi secara manual', async () => {
    await LoginPage.waitUntilLoginEnabled(120000);
});

When('saya menekan tombol Masuk', async () => {
    await LoginPage.submit();
});

When('saya memasukkan PIN dari environment variable', async () => {
    const pin = process.env.MPAJAK_PIN;
    if (!pin) {
        throw new Error('Environment variable MPAJAK_PIN belum diisi.');
    }

    await LoginPage.enterPin(pin);
});

Then('saya berhasil masuk ke halaman setelah login', async () => {
    await LoginPage.waitForLoginResult();
    await expect(LoginPage.postLoginMarker).toBeDisplayed();
    await LoginPage.skipTutorial();
});

Then('saya melihat indikasi login gagal', async () => {
    await LoginPage.waitForLoginError();
    await expect(LoginPage.loginError).toBeDisplayed();
});
