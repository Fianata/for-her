/**
 * Logika tombol "Not Yet" lari dan ganti teks secara acak
 */
function pindahTombol() {
    const btn = document.getElementById('btnEngga');
    const daftarPesan = [
        "nt mell! 😜", "ngeyel! 🙄", "coba lagi! 😋",
        "pencet iyaa aja gasi!? 😡", "dih maksa! 😭",
        "gabisa mel sori! 🤪", "sekali lagi mell! 😜"
    ];

    const pesanAcak = daftarPesan[Math.floor(Math.random() * daftarPesan.length)];
    btn.innerText = pesanAcak;

    btn.style.position = 'fixed';
    const maxX = window.innerWidth - btn.offsetWidth - 50;
    const maxY = window.innerHeight - btn.offsetHeight - 50;

    btn.style.left = Math.random() * maxX + 'px';
    btn.style.top = Math.random() * maxY + 'px';
}

/**
 * Animasi mengetik teks
 */
async function typeWriter(id, text, speed) {
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
 * FUNGSI UTAMA - Pemicu Momen Puncak
 */
async function terimaMaaf() {
    const music = document.getElementById('bgMusic');
    const voice = document.getElementById('voiceAI');
    const scene = document.getElementById('dramatic-scene');
    const videoWrapper = document.querySelector('.video-wrapper-landscape');
    const videoEl = document.getElementById('us-video');
    const replayScreen = document.getElementById('replay-screen');

    // 1. Play Musik (Mulai detik 210 / 3:30)
    music.currentTime = 210;
    music.volume = 0;
    music.play();
    
    // Fade in musik awal (0 ke 0.7) agar tidak mengagetkan di awal
    let fadeIn = setInterval(() => {
        if (music.volume < 0.7) music.volume += 0.05;
        else clearInterval(fadeIn);
    }, 200);

    // 2. Monitoring Waktu Lagu (Stop di Detik 276)
    music.ontimeupdate = () => {
        if (music.currentTime >= 276) { 
            finishEverything();
        }
    };

    function finishEverything() {
        scene.classList.add('fade-out-all');
        let fadeOut = setInterval(() => {
            if (music.volume > 0.02) music.volume -= 0.02;
            else {
                music.pause();
                clearInterval(fadeOut);
                scene.style.display = 'none';
                replayScreen.style.display = 'flex';
                setTimeout(() => { replayScreen.style.opacity = '1'; }, 100);
            }
        }, 100);
    }

    // 3. Transisi Blackout
    document.getElementById('content-wrapper').style.opacity = '0';
    document.getElementById('bg-decorations').style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('content-wrapper').style.display = 'none';
        document.getElementById('bg-decorations').style.display = 'none';
        scene.style.display = 'flex';
    }, 800);

    // 4. MUNCULKAN VIDEO & SUARA AI (DENGAN INSTANT DUCKING)
    await new Promise(r => setTimeout(r, 2500)); 
    videoWrapper.classList.add('show-video');
    videoEl.playbackRate = 0.8; 
    videoEl.play();

    // --- LOGIKA INSTANT DUCKING (Perbaikan Khusus HP) ---
    // Langsung kecilkan volume ke 0.02 (sangat pelan) agar George tidak tenggelam
    music.volume = 0.02; 
    voice.volume = 4.0; // Pastikan volume AI maksimal
    voice.play(); 

    const typoSpeed = 69; // Kecepatan sinkron durasi 25 detik

    await typeWriter("type1", "In the world of literature, there are countless beautiful verses, but none can truly capture how much you mean to me.", typoSpeed);
    await new Promise(r => setTimeout(r, 800));
    
    await typeWriter("type2", "Just like the lyrics in your photo, 'Lights will guide you home'...", typoSpeed);
    await new Promise(r => setTimeout(r, 500));
    
    await typeWriter("type3", "I hope I can be one of those lights that always leads you back to where you feel safe and comfortable.", typoSpeed);
    await new Promise(r => setTimeout(r, 1000));
    
    await typeWriter("type4", "This is truly coming from the bottom of my heart. :)", typoSpeed);

    // --- LOGIKA FADE UP (Menaikkan Volume Musik Kembali) ---
    voice.onended = () => {
        let duckingUp = setInterval(() => {
            if (music.volume < 0.7) music.volume += 0.05;
            else clearInterval(duckingUp);
        }, 150);
        document.getElementById('final-footer').style.display = 'block';
    };
}

