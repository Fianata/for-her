/**
 * 1. LOGIKA TOMBOL "NOT YET" (RUN AWAY)
 * Dibuat responsif agar tidak pernah lari keluar batas layar.
 */
function pindahTombol() {
    const btn = document.getElementById('btnEngga');
    const daftarPesan = [
        "nt mell! 😜", "ngeyel! 🙄", "coba lagi! 😋",
        "pencet iyaa aja gasi!? 😡", "dih maksa! 😭",
        "gabisa mel sori! 🤪", "sekali lagi mell! 😜"
    ];

    btn.innerText = daftarPesan[Math.floor(Math.random() * daftarPesan.length)];
    btn.style.position = 'fixed';
    
    // Memberikan area aman agar tombol tidak nempel ke pinggir layar
    const maxX = window.innerWidth - btn.offsetWidth - 30;
    const maxY = window.innerHeight - btn.offsetHeight - 30;

    btn.style.left = Math.random() * maxX + 'px';
    btn.style.top = Math.random() * maxY + 'px';
}

/**
 * 2. ANIMASI MENGETIK (ASYNC TYPEWRITER)
 */
async function typeWriter(id, text, speed) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = ""; 
    for (let i = 0; i < text.length; i++) {
        el.innerHTML += text.charAt(i);
        await new Promise(res => setTimeout(res, speed));
    }
}

/**
 * 3. FUNGSI RELOAD
 */
function lokasiReload() { window.location.reload(); }

/**
 * 4. FUNGSI UTAMA (SINKRONISASI TOTAL)
 */
async function terimaMaaf() {
    const music = document.getElementById('bgMusic');
    const voice = document.getElementById('voiceAI');
    const scene = document.getElementById('dramatic-scene');
    const videoWrapper = document.querySelector('.video-wrapper-landscape');
    const videoEl = document.getElementById('us-video');
    const replayScreen = document.getElementById('replay-screen');

    // --- A. WEB AUDIO API AMPLIFIER ---
    // Meningkatkan volume AI George agar menembus musik Coldplay
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(voice);
    const gainNode = audioCtx.createGain();
    
    gainNode.gain.value = 4.5; // BOOST VOLUME 450%
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    

    // --- B. JALANKAN MUSIK (COLDPLAY - FIX YOU) ---
    music.currentTime = 210; // Jump ke bagian Reff
    music.volume = 0;
    music.play();
    
    let fadeIn = setInterval(() => {
        if (music.volume < 0.5) music.volume += 0.05;
        else clearInterval(fadeIn);
    }, 200);

    // --- C. TRANSISI VISUAL ---
    // Cukup sembunyikan content-wrapper, dekorasi di dalam ikut hilang
    document.getElementById('content-wrapper').style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('content-wrapper').style.display = 'none';
        scene.style.display = 'flex';
    }, 800);

    // --- D. MOMEN SINEMATIK (VIDEO & VOICE) ---
    await new Promise(r => setTimeout(r, 2500)); 
    
    videoWrapper.classList.add('show-video');
    videoEl.playbackRate = 0.75; 
    videoEl.play();
    voice.play(); 

    // Kecepatan ketik (Typo Speed)
    const typoSpeed = 69; 

    await typeWriter("type1", "In the world of literature, there are countless beautiful verses, but none can truly capture how much you mean to me.", typoSpeed);
    await new Promise(r => setTimeout(r, 800)); 
    
    await typeWriter("type2", "Just like the lyrics in your photo, 'Lights will guide you home'...", typoSpeed);
    await new Promise(r => setTimeout(r, 500));
    
    await typeWriter("type3", "I hope I can be one of those lights that always leads you back to where you feel safe and comfortable.", typoSpeed);
    await new Promise(r => setTimeout(r, 1000));
    
    await typeWriter("type4", "This is truly coming from the bottom of my heart. :)", typoSpeed);

    voice.onended = () => {
        document.getElementById('final-footer').style.display = 'block';
    };

    // --- E. AUTO FINISH ---
    music.ontimeupdate = () => {
        if (music.currentTime >= 275) { 
            scene.style.display = 'none';
            replayScreen.style.display = 'flex';
            setTimeout(() => { replayScreen.style.opacity = '1'; }, 100);
        }
    };
}
