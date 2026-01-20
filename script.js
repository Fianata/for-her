/**
 * 1. Logika tombol "Not Yet" lari
 * Dibuat responsif agar tetap berada di dalam viewport HP manapun.
 */
function pindahTombol(e) {
    if (e) e.stopPropagation(); // Mencegah bubbling event
    
    const btn = document.getElementById('btnEngga');
    const daftarPesan = [
        "nt mell! 😜", "ngeyel! 🙄", "coba lagi! 😋",
        "pencet iyaa aja gasi!? 😡", "dih maksa! 😭",
        "gabisa mel sori! 🤪", "sekali lagi mell! 😜"
    ];

    btn.innerText = daftarPesan[Math.floor(Math.random() * daftarPesan.length)];
    btn.style.position = 'fixed';
    
    // PERBAIKAN: Kalkulasi batas layar yang fleksibel (Safe Zone)
    const padding = 20; // Jarak minimal tombol dari pinggir layar
    const maxX = window.innerWidth - btn.offsetWidth - padding;
    const maxY = window.innerHeight - btn.offsetHeight - padding;

    // Pastikan koordinat minimal adalah nilai padding agar tidak menempel ke atas/kiri
    const newLeft = Math.max(padding, Math.floor(Math.random() * maxX));
    const newTop = Math.max(padding, Math.floor(Math.random() * maxY));

    btn.style.left = newLeft + 'px';
    btn.style.top = newTop + 'px';
}

/**
 * 2. Animasi mengetik teks
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
 * 3. Fungsi Reload
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

    // --- A. SETUP AMPLIFIER ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(voice);
    const gainNode = audioCtx.createGain();
    
    gainNode.gain.value = 4.5; // Gain diperkuat agar narasi George mantap
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // --- B. JALANKAN MUSIK ---
    music.currentTime = 210; 
    music.volume = 0;
    music.play();
    
    let fadeIn = setInterval(() => {
        if (music.volume < 0.6) music.volume += 0.07;
        else clearInterval(fadeIn);
    }, 200);

    // --- C. TRANSISI LAYAR ---
    document.getElementById('content-wrapper').style.opacity = '0';
    const outerDecor = document.getElementById('bg-decorations');
    if (outerDecor) outerDecor.style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('content-wrapper').style.display = 'none';
        if (outerDecor) outerDecor.style.display = 'none';
        scene.style.display = 'flex';
    }, 800);

    // --- D. MOMEN PUNCAK ---
    await new Promise(r => setTimeout(r, 2500)); 
    videoWrapper.classList.add('show-video');
    videoEl.playbackRate = 0.75; 
    videoEl.play();

    voice.play(); 

    const typoSpeed = 69; 

    await typeWriter("type1", "In the world of literature, there are countless beautiful verses, but none can truly capture how much you mean to me.", typoSpeed);
    await new Promise(r => setTimeout(r, 800));
    
    await typeWriter("type2", "just like the lyrics in your photo, 'lights will guide you home'...", typoSpeed);
    await new Promise(r => setTimeout(r, 500));
    
    await typeWriter("type3", "i hope i can be one of those lights that always leads you back to where you feel safe and comfortable.", typoSpeed);
    await new Promise(r => setTimeout(r, 1000));
    
    await typeWriter("type4", "this is truly coming from the bottom of my heart. :)", typoSpeed);

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
