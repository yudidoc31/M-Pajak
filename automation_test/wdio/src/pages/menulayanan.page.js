class LayananPage {
    get homePageMarker() {
        return $('//*[@content-desc="Kredit Tersisa"]');
    }

    get menuLayanan() {
        return $('//*[@content-desc="Layanan" or @text="Layanan"]/ancestor-or-self::*[@clickable="true"][1]');
    }


    get layananPageMarker() {
        return $('//*[@content-desc="Layanan Perpajakan" or @text="Layanan Perpajakan"]');
    }

    async ensureHomePageOpen() {
        await this.homePageMarker.waitForDisplayed({
            timeout: 30000,
            timeoutMsg: 'Halaman beranda tidak tampil setelah login.'
        });
    }

    async clickMenuLayanan() {
        const button = this.menuLayanan;
        await button.waitForDisplayed({
            timeout: 15000,
            timeoutMsg: 'Tombol Layanan yang dapat diklik tidak ditemukan di halaman beranda.'
        });
        await button.waitForEnabled({
            timeout: 10000,
            timeoutMsg: 'Tombol Layanan ditemukan tetapi belum dapat ditekan.'
        });

        let clickError;
        try {
            await button.click();
        } catch (error) {
            clickError = error;
        }

        if (!clickError) {
            try {
                await this.layananPageMarker.waitForDisplayed({ timeout: 5000 });
                return;
            } catch (navigationError) {
                clickError = navigationError;
            }
        }

        try {
            await browser.execute('mobile: clickGesture', {
                elementId: button.elementId
            });
        } catch (gestureError) {
            throw new Error(
                `Gagal menekan tombol Layanan. Klik standar/navigasi gagal: ${clickError.message}. ` +
                `clickGesture juga gagal: ${gestureError.message}.`,
                { cause: gestureError }
            );
        }

        await this.waitForLayananPage();
    }

    async waitForLayananPage() {
        await this.layananPageMarker.waitForDisplayed({
            timeout: 15000,
            timeoutMsg: 'Halaman Layanan tidak terbuka: penanda "Layanan Perpajakan" tidak ditemukan.'
        });
    }
}

module.exports = new LayananPage();
