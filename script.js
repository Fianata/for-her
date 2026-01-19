/**
 * Logika tombol Not Yet lari
 */
/**
 * Logika tombol Not Yet lari dan ganti teks secara acak
 */
function pindahTombol() {
    const btn = document.getElementById('btnEngga');
    
    // 1. Buat daftar pesan yang bakal muncul di tombol
    const daftarPesan = [
        "nt mell! 😜",
        "ngeyel! 🙄",
        "coba lagi! 😋",
        "pencet iyaa aja gasi!? 😡",
        "dih maksa! 😭",
        "gabisa mel sori! 🤪",
        "sekali lagi mell! 😜"
    ];

    // 2. Pilih pesan secara acak dari array
    const pesanAcak = daftarPesan[Math.floor(Math.random() * daftarPesan.length)];
    btn.innerText = pesanAcak;

    // 3. Logika pindah posisi (tetap sama)
    btn.style.position = 'fixed';
    const maxX = window.innerWidth - btn.offsetWidth - 50;
    const maxY = window.innerHeight - btn.offsetHeight - 50;

    // Pastikan tidak lari keluar batas layar iPhone 11 Pro Max
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
}

/**
 * Animasi mengetik teks
 */
async function typeWriter(id, text, speed = 40) {
    const el = document.getElementById(id);
    for (let i = 0; i < text.length; i++) {
        el.innerHTML += text.charAt(i);
        await new Promise(res => setTimeout(res, speed));
    }
}

/**
 * Fungsi Utama saat Tombol YES diklik
 */
async function terimaMaaf() {
    const music = document.getElementById('bgMusic');
    const scene = document.getElementById('dramatic-scene');
    const videoWrapper = document.querySelector('.video-wrapper-landscape');
    const videoEl = document.getElementById('us-video');

    // 1. Play Musik (3:30 = 210 detik) & Fade In
    music.currentTime = 210;
    music.volume = 0;
    music.play();
    let fade = setInterval(() => {
        if (music.volume < 0.7) music.volume += 0.1;
        else clearInterval(fade);
    }, 150);

    // 2. Transisi Blackout
    document.getElementById('content-wrapper').style.opacity = '0';
    document.getElementById('bg-decorations').style.opacity = '0';

    setTimeout(() => {
        document.getElementById('content-wrapper').style.display = 'none';
        document.getElementById('bg-decorations').style.display = 'none';
        scene.style.display = 'flex';
    }, 800);

    // 3. Momen Video Muncul (Fade In)
    await new Promise(r => setTimeout(r, 1200)); 
    videoWrapper.classList.add('show-video');
    videoEl.playbackRate = 0.8;
    videoEl.play(); 

    // 4. Animasi Ketik Romantis (English Vers.)
    await new Promise(r => setTimeout(r, 1000));
    await typeWriter("type1", "In the world of literature, there are countless beautiful verses, but none can truly capture how much you mean to me.");
    await new Promise(r => setTimeout(r, 800));
    
    await typeWriter("type2", "Just like the lyrics in your photo, 'Lights will guide you home'...");
    await new Promise(r => setTimeout(r, 500));
    
    await typeWriter("type3", "I hope I can be one of those lights that always leads you back to where you feel safe and comfortable.");
    await new Promise(r => setTimeout(r, 1000));
    
    await typeWriter("type4", "This is truly coming from the bottom of my heart. :)");
    
    document.getElementById('final-footer').style.display = 'block';
}

// Fungsi untuk reload halaman (Replay)
function lokasiReload() {
    window.location.reload();
}

async function terimaMaaf() {
    const music = document.getElementById('bgMusic');
    const scene = document.getElementById('dramatic-scene');
    const videoWrapper = document.querySelector('.video-wrapper-landscape');
    const videoEl = document.getElementById('us-video');
    const replayScreen = document.getElementById('replay-screen');

    // 1. Play Musik (3:30)
    music.currentTime = 210;
    music.volume = 0;
    music.play();
    
    // Fade in musik
    let fadeIn = setInterval(() => {
        if (music.volume < 0.7) music.volume += 0.05;
        else clearInterval(fadeIn);
    }, 200);

    // 2. Monitoring Waktu Lagu (Stop di 4:50)
    music.ontimeupdate = () => {
        if (music.currentTime >= 276) { // 4 menit 50 detik
            finishEverything();
        }
    };

    // Fungsi untuk mengakhiri momen
    function finishEverything() {
        // Meredupkan layar (Fade Out)
        scene.classList.add('fade-out-all');
        
        // Pelan-pelan kecilkan suara musik (Fade Out Musik)
        let fadeOut = setInterval(() => {
            if (music.volume > 0.05) music.volume -= 0.05;
            else {
                music.pause();
                clearInterval(fadeOut);
                
                // Tampilkan Tombol Replay setelah layar gelap
                scene.style.display = 'none';
                replayScreen.style.display = 'flex';
                setTimeout(() => { replayScreen.style.opacity = '1'; }, 100);
            }
        }, 200);
    }

    // 3. Transisi Blackout Awal (Logika sebelumnya)
    document.getElementById('content-wrapper').style.opacity = '0';
    document.getElementById('bg-decorations').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('content-wrapper').style.display = 'none';
        scene.style.display = 'flex';
    }, 800);

    // 4. Munculkan Video & Typing (Logika sebelumnya)
    await new Promise(r => setTimeout(r, 1200)); 
    videoWrapper.classList.add('show-video');
    videoEl.playbackRate = 0.8;
    videoEl.play(); 

    await new Promise(r => setTimeout(r, 1000));
    await typeWriter("type1", "In the world of literature, there are countless beautiful verses, but none can truly capture how much you mean to me.");
    await new Promise(r => setTimeout(r, 800));
    await typeWriter("type2", "Just like the lyrics in your photo, 'Lights will guide you home'...");
    await new Promise(r => setTimeout(r, 500));
    await typeWriter("type3", "I hope I can be one of those lights that always leads you back to where you feel safe and comfortable.");
    await new Promise(r => setTimeout(r, 1000));
    await typeWriter("type4", "This is truly coming from the bottom of my heart. :)");
    
    document.getElementById('final-footer').style.display = 'block';
}

