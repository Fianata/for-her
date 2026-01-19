function pindahTombol() {
    const btn = document.getElementById('btnEngga');
    
    // 1. Biar tombolnya bisa ke mana aja, kita pake 'fixed'
    btn.style.position = 'fixed';
    btn.style.zIndex = '999';

    // 2. Kasih padding dikit biar ga bener-bener nempel ke pojok (biar tetep estetik)
    const padding = 80;

    // 3. Ambil ukuran layar asli (Viewport)
    // window.innerWidth/Height itu ambil total dimensi layar HP/Laptop
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // 4. Hitung batas maksimal tombol boleh pindah
    const maxX = screenWidth - btn.offsetWidth - padding;
    const maxY = screenHeight - btn.offsetHeight - padding;

    // 5. Generate koordinat random dari 0 sampe batas maksimal
    // Math.random() ngasih angka 0-1, kita kaliin sama batas maksimalnya
    const randomX = Math.floor(Math.random() * maxX) + (padding / 2);
    const randomY = Math.floor(Math.random() * maxY) + (padding / 2);

    // 6. Terapkan posisinya
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';

    // 7. Ganti teks secara random biar makin gemes
    const messages = [
        "not today! 💅", 
        "nice try! 😜✨", 
        "still nope! 🙅‍♀️", 
        "too slow! 💨",
        "oops, missed! 🎀",
        "try again! 🤪"
    ];
    const randomText = messages[Math.floor(Math.random() * messages.length)];
    btn.innerText = randomText;
}

function terimaMaaf() {
    const main = document.getElementById('mainCard');
    const success = document.getElementById('successCard');
    
    main.style.display = 'none';
    success.style.display = 'block';
}
