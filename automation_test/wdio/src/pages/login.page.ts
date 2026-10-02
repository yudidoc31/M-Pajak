declare const $: any;

class LoginPage {
    /*
     * SELECTOR PENTING:
     * Screenshot tidak memperlihatkan resource-id / content-desc.
     * Selector di bawah adalah kandidat berdasarkan teks/hint dan urutan
     * EditText. Verifikasi dan sesuaikan melalui Appium Inspector.
     */

    // Kandidat: input pertama = ID Pengguna, input kedua = Kata Sandi.
    get userIdInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    get passwordInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    get loginButton() {
        return $('android=new UiSelector().text("Masuk")');
    }

    // Kandidat berdasarkan teks yang tampak pada screenshot.
    get captchaArea() {
        return $('android=new UiSelector().textContains("Saya Bukan Robot")');
    }

    /*
     * Ganti dengan selector yang benar setelah melihat halaman tujuan login.
     * Contoh sementara: elemen unik pada halaman beranda setelah login.
     */
    get postLoginMarker() {
        return $('~mpajak-home');
    }

    /*
     * Pesan error belum terlihat pada screenshot. Ganti selector dengan
     * teks atau resource-id pesan gagal yang benar dari aplikasi.
     */
    get loginError() {
        return $('android=new UiSelector().textContains("tidak")');
    }

    async waitForLoginPage(): Promise<void> {
        await this.userIdInput.waitForDisplayed({ timeout: 20000 });
        await this.passwordInput.waitForDisplayed({ timeout: 20000 });
        await this.loginButton.waitForDisplayed({ timeout: 20000 });
    }

    async enterUserId(value: string): Promise<void> {
        await this.userIdInput.setValue(value);
    }

    async enterPassword(value: string): Promise<void> {
        await this.passwordInput.setValue(value);
    }

    async waitUntilLoginEnabled(timeout = 120000): Promise<void> {
        await this.loginButton.waitForEnabled({ timeout });
    }

    async submit(): Promise<void> {
        await this.loginButton.click();
    }

    async waitForLoginResult(): Promise<void> {
        await this.postLoginMarker.waitForDisplayed({ timeout: 30000 });
    }

    async waitForLoginError(): Promise<void> {
        await this.loginError.waitForDisplayed({ timeout: 30000 });
    }
}

export default new LoginPage();
