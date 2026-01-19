/**
 * Logika tombol Not Yet lari dan ganti teks secara acak
 */
function pindahTombol() {
    const btn = document.getElementById('btnEngga');
    
    // 1. Daftar pesan acak
    const daftarPesan = [
        "nt mell! 😜",
        "ngeyel! 🙄",
        "coba lagi! 😋",
        "pencet iyaa aja gasi!? 😡",
        "dih maksa! 😭",
        "gabisa mel sori! 🤪",
        "sekali lagi mell! 😜"
    ];

    // 2. Pilih pesan acak
    const pesanAcak = daftarPesan[Math.floor(Math.random() * daftarPesan.length)];
    btn.innerText = pesanAcak;

    // 3. Pindah posisi
    btn.style.position = 'fixed';
    const maxX = window.innerWidth - btn.offsetWidth - 50;
    const maxY = window.innerHeight - btn.offsetHeight - 50;

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
 * Fungsi untuk reload halaman (Replay)
 */
function lokasiReload() {
    window.location.reload();
}

/**
 * FUNGSI UTAMA (Sudah Digabung)
 */
async function terimaMaaf() {
    const music = document.getElementById('bgMusic');
    const voice = document.getElementById('voiceAI');
    const scene = document.getElementById('dramatic-scene');
    const videoWrapper = document.querySelector('.video-wrapper-landscape');
    const videoEl = document.getElementById('us-video');
    const replayScreen = document.getElementById('replay-screen');

    // 1. Play Musik (Mulai detik 210)
    music.currentTime = 210;
    music.volume = 0;
    music.play();
    
    // Fade in musik awal
    let fadeIn = setInterval(() => {
        if (music.volume < 0.7) music.volume += 0.1;
        else clearInterval(fadeIn);
    }, 150);

    // 2. Monitoring Waktu Lagu (Berhenti & Fade Out di detik 276)
    music.ontimeupdate = () => {
        if (music.currentTime >= 276) { 
            finishEverything();
        }
    };

    // Fungsi penutup momen
    function finishEverything() {
        scene.classList.add('fade-out-all');
        
        let fadeOut = setInterval(() => {
            if (music.volume > 0.05) music.volume -= 0.05;
            else {
                music.pause();
                clearInterval(fadeOut);
                scene.style.display = 'none';
                replayScreen.style.display = 'flex';
                setTimeout(() => { replayScreen.style.opacity = '1'; }, 100);
            }
        }, 200);
    }

    // 3. Transisi Blackout
    document.getElementById('content-wrapper').style.opacity = '0';
    document.getElementById('bg-decorations').style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('content-wrapper').style.display = 'none';
        document.getElementById('bg-decorations').style.display = 'none';
        scene.style.display = 'flex';
    }, 800);

    // 4. MUNCULKAN VIDEO & SUARA AI (Momen Puncak)
    // Jeda 2.5 detik agar video muncul dulu dengan cantik di HP
    await new Promise(r => setTimeout(r, 2500)); 
    videoWrapper.classList.add('show-video');
    videoEl.playbackRate = 0.8; // Video diperlambat agar estetik
    videoEl.play();

    // --- LOGIKA ELEVENLABS (AUDIO DUCKING) ---
    music.volume = 0.3; // Kecilkan musik agar suara AI Marcus/Bella terdengar jelas
    voice.play();

    // Jalankan animasi ketik barengan sama suara AI
    await typeWriter("type1", "In the world of literature, there are countless beautiful verses, but none can truly capture how much you mean to me.");
    await new Promise(r => setTimeout(r, 800));
    
    await typeWriter("type2", "Just like the lyrics in your photo, 'Lights will guide you home'...");
    await new Promise(r => setTimeout(r, 500));
    
    await typeWriter("type3", "I hope I can be one of those lights that always leads you back to where you feel safe and comfortable.");
    await new Promise(r => setTimeout(r, 1000));
    
    await typeWriter("type4", "This is truly coming from the bottom of my heart. :)");

    // Setelah suara AI selesai, naikkan lagi volume musik Coldplay-nya
    voice.onended = () => {
        let fadeUp = setInterval(() => {
            if (music.volume < 0.7) music.volume += 0.05;
            else clearInterval(fadeUp);
        }, 200);
        document.getElementById('final-footer').style.display = 'block';
    };
}
