function pindahTombol() {
    const btn = document.getElementById('btnEngga');
    
    // Paksa mode FIXED biar dia bisa kabur ke seluruh layar (keluar dari card)
    btn.style.position = 'fixed';

    // Deteksi ukuran layar HP (Viewport)
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Batas aman biar ga terlalu mepet ke ujung layar
    const padding = 100;

    // Hitung posisi random (Chaos Mode)
    const maxX = screenWidth - btn.offsetWidth - padding;
    const maxY = screenHeight - btn.offsetHeight - padding;

    const randomX = Math.floor(Math.random() * maxX) + (padding / 2);
    const randomY = Math.floor(Math.random() * maxY) + (padding / 2);

    // Terapkan koordinat ke tombol
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';

    // Berikan respon teks yang lucu & English Lit friendly
    const messages = [
        "not today, bestie! 💅", 
        "catch me if you can! 😜", 
        "still a no! 🙅‍♀️", 
        "nice try, Tory! 🎀",
        "oops, missed! ✨",
        "you can't catch me! 🤪"
    ];
    btn.innerText = messages[Math.floor(Math.random() * messages.length)];
}

function terimaMaaf() {
    const main = document.getElementById('mainCard');
    const success = document.getElementById('successCard');
    const btnEngga = document.getElementById('btnEngga');

    // Sembunyikan tombol "Not Yet" secara permanen
    if (btnEngga) btnEngga.style.display = 'none';

    // Transisi Card
    main.style.display = 'none';
    success.style.display = 'block';
}
