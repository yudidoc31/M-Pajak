class LoginPage {
    get startButton() {
        return $('//android.widget.TextView[@text="Mulai"]');
    }

    get skipButton() {
        return $('//android.widget.TextView[@text="Skip"]');
    }

    get coretaxButton() {
        return $('//android.widget.TextView[@text="Masuk dengan Akun Coretax DJP"]');
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
        return $('//android.widget.TextView[@text="Masuk"]');
    }

    // PIN digit buttons (used after pressing Masuk)
    get pinButton1() { return $('//android.widget.TextView[@text="1"]'); }
    get pinButton2() { return $('//android.widget.TextView[@text="2"]'); }
    get pinButton3() { return $('//android.widget.TextView[@text="3"]'); }
    get pinButton4() { return $('//android.widget.TextView[@text="4"]'); }
    get pinButton5() { return $('//android.widget.TextView[@text="5"]'); }
    get pinButton6() { return $('//android.widget.TextView[@text="6"]'); }

    get captchaArea() {
        return $('//android.view.ViewGroup[@content-desc="Saya Bukan Robot"]/android.view.ViewGroup');
    }

    get postLoginMarker() {
        return $('~home');
    }

    get loginError() {
        return $('android=new UiSelector().textContains("Login")');
    }

    async openAppFromLauncher() {
        try {
            await browser.activateApp('id.go.pajak.djp.beta');
        } catch (err) {
            try {
                await browser.startActivity({
                    appPackage: 'id.go.pajak.djp.beta',
                    appActivity: '.MainActivity'
                });
            } catch (startErr) {
                // Ignore launch failures, continue with whichever screen is already open.
            }
        }
    }

    async ensureLoginPageOpen() {
        try {
            await this.userIdInput.waitForDisplayed({ timeout: 10000 });
            return;
        } catch (err) {
            try {
                await this.startButton.waitForDisplayed({ timeout: 10000 });
                await this.startButton.click();
            } catch (startErr) {
                // Continue to app activation fallback if the splash screen is not present.
            }

            try {
                await this.coretaxButton.waitForDisplayed({ timeout: 5000 });
                await this.coretaxButton.click();
            } catch (coretaxErr) {
                // Optional: Coretax button may not appear on every app start.
            }

            try {
                await this.skipButton.waitForDisplayed({ timeout: 5000 });
                await this.skipButton.click();
            } catch (skipErr) {
                // Skip tooltip is optional and may not appear on all app states.
            }

            await this.openAppFromLauncher();
            await this.userIdInput.waitForDisplayed({ timeout: 20000 });
        }
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
        // pin: string or number like '123456'
        const digits = String(pin).split('');
        for (const d of digits) {
            // map digit to the getter; fallback to direct xpath
            let btn;
            switch (d) {
                case '1': btn = this.pinButton1; break;
                case '2': btn = this.pinButton2; break;
                case '3': btn = this.pinButton3; break;
                case '4': btn = this.pinButton4; break;
                case '5': btn = this.pinButton5; break;
                case '6': btn = this.pinButton6; break;
                default:
                    btn = $(`//android.widget.TextView[@text="${d}"]`);
            }

            try {
                await btn.waitForDisplayed({ timeout: 5000 });
                await btn.click();
                await browser.pause(200);
            } catch (err) {
                // If a digit button is not found/clickable, throw so the caller can handle
                throw new Error(`PIN digit '${d}' not available or not clickable`);
            }
        }
    }

    async submit() {
        await this.loginButton.click();
    }

    async waitForLoginResult() {
        await this.postLoginMarker.waitForDisplayed({ timeout: 30000 });
    }

    async waitForLoginError() {
        await this.loginError.waitForDisplayed({ timeout: 30000 });
    }
}

module.exports = new LoginPage();
