run
    pastikan di folder (cd wdio) dan kalau file ts harus diubah dahulu ke format js
    ![alt text](image.png)

1. npx wdio run wdio.conf.js --spec ./features/login.feature

2.kalau ada memasukkan pin, untuk perintah runnya seperti ini
    $env:MPAJAK_PIN = '123456'
    npx wdio run wdio.conf.js --spec ./features/login.feature

    perintah copilot dengan terminal "powerShell"
    Set-Location 'C:\Users\Yudi Mulyadi\OneDrive\Documents\Mpajak Project\automation_test\wdio'; $env:MPAJAK_PIN = '123456'; npx wdio run wdio.conf.js --spec ./features/login.feature

3. perintah dengan terminal "gitbash"
cd "/c/Users/Yudi Mulyadi/OneDrive/Documents/Mpajak Project/automation_test/wdio"
$ MPAJAK_PIN=123456 npx wdio run wdio.conf.js --spec ./features/login.feature

Untuk mengecek bahwa environment variable tersedia tanpa menampilkan PIN-nya:
$ if [[ -n "${MPAJAK_PIN:-}" ]]; then echo "MPAJAK_PIN tersedia"; else echo "MPAJAK_PIN belum tersedia"; fi

4. perintah tanpa menjalankan negatif dan smoke tes
cd Yudi Mulyadi@Workpro-Lite MINGW64 ~/OneDrive/Documents/Mpajak Project/automation_test/wdi (main)
                V note (pastikan server appium dijalankan)
$ MPAJAK_PIN=123456 npx wdio run wdio.conf.js --spec ./features/login.feature --cucumberOpts.tagExpression '@login-success'

*****************************************************************************************************************