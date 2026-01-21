let audioCtx;
let voiceSource;
let audioGain;

/**
 * 1. LOGIKA TOMBOL KABUR (STABLE VIEWPORT)
 */
function pindahTombol(e) {
    if (e) { e.stopPropagation(); e.preventDefault(); }
    const btn = document.getElementById('btnEngga');
    const daftarPesan = ["nt mell! 😜", "ngeyel! 🙄", "coba lagi! 😋", "pencet iyaa aja gasi!? 😡", "gabisa mel sori! 🤪"];
    btn.innerText = daftarPesan[Math.floor(Math.random() * daftarPesan.length)];
    
    btn.style.position = 'fixed';
    const padding = 25; 
    const maxX = window.innerWidth - btn.offsetWidth - padding;
    const maxY = window.innerHeight - btn.offsetHeight - padding;
    
    btn.style.left = Math.max(padding, Math.floor(Math.random() * maxX)) + 'px';
    btn.style.top = Math.max(padding, Math.floor(Math.random() * maxY)) + 'px';
    return false;
}

/**
 * 2. TYPEWRITER ENGINE
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
 * 3. MAIN CINEMATIC FUNCTION (MOBILE COMPATIBILITY FIX)
 */
async function terimaMaaf() {
    const music = document.getElementById('bgMusic');
    const voice = document.getElementById('voiceAI');
    const scene = document.getElementById('dramatic-scene');
    const videoWrapper = document.querySelector('.video-wrapper-landscape');
    const videoEl = document.getElementById('us-video');
    const replayScreen = document.getElementById('replay-screen');

    // --- AUDIO ENGINE START ---
    
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            audioGain = audioCtx.createGain();
            audioGain.gain.value = 4.5; // Gain narasi George
            voiceSource = audioCtx.createMediaElementSource(voice);
            voiceSource.connect(audioGain);
            audioGain.connect(audioCtx.destination);
        }
        if (audioCtx.state === 'suspended') await audioCtx.resume();
    } catch (e) { console.log("Audio Engine Error:", e); }

    // MULAI MUSIK (FIX YOU)
    music.currentTime = 210; 
    music.volume = 0.5;
    music.play().catch(err => console.log("Music blocked"));

    // TRANSISI LAYAR
    document.getElementById('content-wrapper').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('content-wrapper').style.display = 'none';
        scene.style.display = 'flex'; 
    }, 800);

    // --- VIDEO & VOICE SYNC LOGIC ---
    await new Promise(r => setTimeout(r, 2000)); // Kasih jeda transisi

    // KUNCI MOBILE: Paksa video untuk muted dan load ulang sebelum play
    videoEl.muted = true; 
    videoEl.load(); 
    videoEl.playbackRate = 0.75; // Slow-mo request lu

    // Mainkan Video dengan catch block untuk autoplay mobile
    videoEl.play().then(() => {
        videoWrapper.classList.add('show-video');
    }).catch(err => {
        console.log("Video play failed, retrying muted...", err);
        videoEl.muted = true; // Paksa muted lagi jika gagal
        videoEl.play();
        videoWrapper.classList.add('show-video');
    });

    // Mainkan Suara Narasi
    voice.play().catch(err => console.log("Voice blocked"));

    // TYPEWRITER SEQUENTIAL
    const typoSpeed = 69; 
    await typeWriter("type1", "In the world of literature, there are countless beautiful verses, but none can truly capture how much you mean to me.", typoSpeed);
    await new Promise(r => setTimeout(r, 1000));
    await typeWriter("type2", "just like the lyrics in your photo, 'lights will guide you home'...", typoSpeed);
    await new Promise(r => setTimeout(r, 820));
    await typeWriter("type3", "i hope i can be one of those lights that always leads you back to where you feel safe and comfortable.", typoSpeed);
    await new Promise(r => setTimeout(r, 1000));
    await typeWriter("type4", "this is truly coming from the bottom of my heart. :)", typoSpeed);

    // FOOTER MUNCUL
    const footer = document.getElementById('final-footer');
    if (footer) {
        footer.style.display = 'block';
        setTimeout(() => { footer.style.opacity = '1'; }, 50);
    }

    // AUTO-FINISH (Detik 275)
    music.ontimeupdate = () => {
        if (music.currentTime >= 275) { 
            scene.style.display = 'none';
            replayScreen.style.display = 'flex';
            setTimeout(() => { replayScreen.style.opacity = '1'; }, 100);
            music.ontimeupdate = null; // Clear listener biar gak loop
        }
    };
}



