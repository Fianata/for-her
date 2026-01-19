function pindahTombol() {
    const btn = document.getElementById('btnEngga');
    
    // Paksa statusnya jadi fixed agar bisa pindah ke seluruh layar
    btn.style.position = 'fixed';

    // Ambil ukuran layar HP yang tersedia (Safe Area)
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Batasan agar tombol tidak keluar dari layar (Margin 80px)
    const margin = 80;
    
    // Hitung koordinat random X (Kiri-Kanan) dan Y (Atas-Bawah)
    const maxX = screenWidth - btn.offsetWidth - margin;
    const maxY = screenHeight - btn.offsetHeight - margin;

    // Generate angka random
    const randomX = Math.floor(Math.random() * maxX) + (margin / 2);
    const randomY = Math.floor(Math.random() * maxY) + (margin / 2);

    // Terapkan ke gaya tombol
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';

    // Pesan bilingual buat anak English Lit
    const messages = [
        "not today, bestie! 💅", 
        "nice try! 😜✨", 
        "catch me if you can! 🙅‍♀️", 
        "still a no! 💨",
        "oops, missed! 🎀",
        "you can't catch me! 🤪"
    ];
    btn.innerText = messages[Math.floor(Math.random() * messages.length)];
}

function terimaMaaf() {
    const main = document.getElementById('mainCard');
    const success = document.getElementById('successCard');
    const btnEngga = document.getElementById('btnEngga');

    // Sembunyikan tombol "Not Yet" agar tidak lari-lari lagi
    if (btnEngga) btnEngga.style.display = 'none';

    main.style.display = 'none';
    success.style.display = 'block';
}
