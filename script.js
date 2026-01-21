let audioCtx;
let voiceSource;
let audioGain;

/**
 * 1. LOGIKA TOMBOL KABUR
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
 * 3. TAHAP 1: PINDAH KE KARTU PESAN
 */
async function terimaMaaf() {
    document.getElementById('content-wrapper').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('content-wrapper').style.display = 'none';
        const thankyouWrapper = document.getElementById('thankyou-card-wrapper');
        thankyouWrapper.style.display = 'flex';
        setTimeout(() => { thankyouWrapper.classList.add('show'); }, 50);
    }, 800);

    // Initial Audio Context (User Gesture)
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

/**
 * 4. TAHAP 2: MASUK KE VIDEO SINEMATIK
 */
async function lanjutKeVideo() {
    const music = document.getElementById('bgMusic');
    const voice = document.getElementById('voiceAI');
    const scene = document.getElementById('dramatic-scene');
    const videoWrapper = document.querySelector('.video-wrapper-landscape');
    const videoEl = document.getElementById('us-video');
    const thankyouWrapper = document.getElementById('thankyou-card-wrapper');

    // Resume Audio for Mobile
    if (audioCtx && audioCtx.state === 'suspended') { await audioCtx.resume(); }

    thankyouWrapper.classList.remove('show');
    setTimeout(() => {
        thankyouWrapper.style.display = 'none';
        scene.style.display = 'flex'; 
    }, 800);

    // SETUP AUDIO NODES (VOICE BOOST)
    if (!voiceSource) {
        audioGain = audioCtx.createGain();
        audioGain.gain.value = 4.5;
        voiceSource = audioCtx.createMediaElementSource(voice);
        voiceSource.connect(audioGain);
        audioGain.connect(audioCtx.destination);
    }

    music.currentTime = 210; 
    music.volume = 0.5;
    music.play();

    await new Promise(r => setTimeout(r, 2000)); 
    
    // VIDEO CONFIG
    videoEl.muted = true;
    videoEl.playbackRate = 0.75;
    videoEl.play().then(() => { videoWrapper.classList.add('show-video'); });
    voice.play();

    const typoSpeed = 65; 
    await typeWriter("type1", "In the world of literature, there are countless beautiful verses, but none can truly capture how much you mean to me.", typoSpeed);
    await new Promise(r => setTimeout(r, 1000));
    await typeWriter("type2", "just like the lyrics in your photo, 'lights will guide you home'...", typoSpeed);
    await new Promise(r => setTimeout(r, 800));
    await typeWriter("type3", "i hope i can be one of those lights that always leads you back to where you feel safe and comfortable.", typoSpeed);
    await new Promise(r => setTimeout(r, 1200));
    await typeWriter("type4", "this is truly coming from the bottom of my heart. :)", typoSpeed);

    document.getElementById('final-footer').style.display = 'block';
    setTimeout(() => { document.getElementById('final-footer').style.opacity = '1'; }, 50);
    
    music.ontimeupdate = () => {
        if (music.currentTime >= 275) { 
            scene.style.display = 'none';
            document.getElementById('replay-screen').style.display = 'flex';
            setTimeout(() => { document.getElementById('replay-screen').style.opacity = '1'; }, 100);
        }
    };
}
