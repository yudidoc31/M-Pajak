const { Then, When } = require('@wdio/cucumber-framework');
const LayananPage = require('../../src/pages/menulayanan.page.js');
const LoginPage = require('../../src/pages/login.page.js');

Then('saya berada di halaman beranda', async () => {
    await LayananPage.ensureHomePageOpen();
});

When('saya menekan tombol skip tutorial', async () => {
    await LoginPage.skipTutorial();
});

When('saya menekan menu Layanan', async () => {
    await LayananPage.clickMenuLayanan();
});

Then('saya diarahkan ke halaman Layanan', async () => {
    await LayananPage.waitForLayananPage();
});
