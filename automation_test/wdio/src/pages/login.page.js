class LoginPage {
    get startButton() {
        return $('//android.widget.Button[@content-desc="Mulai"]');
    }

    get skipButton() {
        return $('//android.widget.Button[@content-desc="Skip"]');
    }

    get coretaxButton() {
        return $('//android.widget.Button[@content-desc="Masuk dengan Akun Coretax DJP"]');
    }

    get appLauncherIcon() {
        return $('~app_icon');
    }

    get userIdInput() {
        return $('//android.widget.EditText[@content-desc="ID Pengguna"]');
    }

    get passwordInput() {
        return $('//android.widget.EditText[@content-desc="Kata Sandi"]');
    }

    get loginButton() {
        return $('//android.widget.Button[@content-desc="Masuk"]');
    }

    // PIN digit buttons (used after pressing Masuk)
    getPinButton(digit) {
        return $(`//*[@content-desc="Tombol ${digit}"]`);
    }

    getPinButtonByText(digit) {
        return $(`//android.widget.TextView[@text="${digit}"]`);
    }

    get captchaArea() {
        return $('//android.view.ViewGroup[@content-desc="Saya Bukan Robot"]/android.view.ViewGroup');
    }

    get postLoginMarker() {
        return $('//android.widget.Button[@content-desc="Skip Tutorial"]');
    }

    get loginError() {
        return $('android=new UiSelector().textContains("Login")');
    }

    async openAppFromLauncher() {
        await browser.startActivity({
            appPackage: 'id.go.pajak.djp.beta',
            appActivity: '.MainActivity'
        });
    }

    async ensureLoginPageOpen() {
        if (await this.userIdInput.isDisplayed()) {
            return;
        }

        let startedFromWelcome = false;
        if (await this.startButton.isDisplayed()) {
            await this.startButton.click();
            startedFromWelcome = true;
        } else if (await this.coretaxButton.isDisplayed()) {
            await this.coretaxButton.click();
        } else {
            await this.openAppFromLauncher();
            await this.startButton.waitForDisplayed({ timeout: 20000 });
            await this.startButton.click();
            startedFromWelcome = true;
        }

        if (startedFromWelcome) {
            await browser.waitUntil(async () => (
                await this.userIdInput.isDisplayed() ||
                await this.skipButton.isDisplayed() ||
                await this.coretaxButton.isDisplayed()
            ), {
                timeout: 20000,
                timeoutMsg: 'Setelah menekan Mulai, layar login atau panduan tidak muncul.'
            });
        }

        if (await this.skipButton.isDisplayed()) {
            await this.skipButton.click();
        }

        if (!(await this.userIdInput.isDisplayed())) {
            await this.coretaxButton.waitForDisplayed({ timeout: 15000 });
            await this.coretaxButton.click();
        }

        await this.userIdInput.waitForDisplayed({ timeout: 20000 });
    }

    async waitForLoginPage() {
        await this.userIdInput.waitForDisplayed({ timeout: 20000 });
        await this.passwordInput.waitForDisplayed({ timeout: 20000 });
        await this.loginButton.waitForDisplayed({ timeout: 20000 });
    }

    async enterUserId(value) {
        await this.userIdInput.clearValue();
        await this.userIdInput.setValue(value);
    }

    async enterPassword(value) {
        await this.passwordInput.clearValue();
        await this.passwordInput.setValue(value);
    }

    async waitUntilLoginEnabled(timeout = 120000) {
        // try to auto-complete CAPTCHA if present, then wait for login button to enable
        await this.completeCaptcha().catch(() => {});
        await this.loginButton.waitForEnabled({ timeout });
    }

    async completeCaptcha(timeout = 5000) {
        try {
            await this.captchaArea.waitForDisplayed({ timeout });
            await this.captchaArea.click();
        } catch (err) {
            // captcha checkbox not present or not clickable — ignore
        }
    }

    async enterPin(pin) {
        const pinValue = String(pin);
        if (!/^\d+$/.test(pinValue)) {
            throw new Error('PIN harus berisi satu atau lebih digit angka.');
        }

        for (const digit of pinValue) {
            let button = this.getPinButton(digit);
            try {
                await button.waitForDisplayed({ timeout: 3000 });
            } catch (descriptionError) {
                button = this.getPinButtonByText(digit);
                try {
                    await button.waitForDisplayed({ timeout: 3000 });
                } catch (textError) {
                    throw new Error(
                        `Tombol PIN '${digit}' tidak ditemukan dengan content-desc maupun teks. ` +
                        `content-desc: ${descriptionError.message}. teks: ${textError.message}.`,
                        { cause: textError }
                    );
                }
            }

            try {
                await button.click();
            } catch (clickError) {
                try {
                    await browser.execute('mobile: clickGesture', {
                        elementId: button.elementId
                    });
                } catch (gestureError) {
                    throw new Error(
                        `Gagal menekan tombol PIN '${digit}'. Klik standar gagal: ${clickError.message}. ` +
                        `clickGesture juga gagal: ${gestureError.message}.`,
                        { cause: gestureError }
                    );
                }
            }
            await browser.pause(200);
        }
    }

    async submit() {
        await this.loginButton.click();
    }

    async waitForLoginResult() {
        await this.postLoginMarker.waitForDisplayed({ timeout: 30000 });
    }

    async skipTutorial() {
        await this.postLoginMarker.click();
        await this.postLoginMarker.waitForDisplayed({ reverse: true, timeout: 10000 });
    }

    async waitForLoginError() {
        await this.loginError.waitForDisplayed({ timeout: 30000 });
    }
}

module.exports = new LoginPage();
