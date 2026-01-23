let audioCtx;
let voiceSource;
let audioGain;

// --- 1. LOGIC TOMBOL LARI ---
function pindahTombol(e) {
    if (e) { e.stopPropagation(); e.preventDefault(); }
    
    const btn = document.getElementById('btnEngga');
    const card = document.getElementById('mainCard'); 
    
    const daftarPesan = ["nt mell! 😜", "ngeyel! 🙄", "coba lagi! 😋", "pencet iyaa aja gasi!? 😡", "gabisa mel sori! 🤪"];
    
    btn.innerText = daftarPesan[Math.floor(Math.random() * daftarPesan.length)];
    
    if (btn.parentNode !== card) { card.appendChild(btn); }
    
    btn.style.position = 'absolute';
    btn.style.zIndex = '100'; 
    
    const margin = 30;
    const maxX = card.clientWidth - btn.offsetWidth - margin;
    const maxY = card.clientHeight - btn.offsetHeight - margin;
    
    const randomX = Math.floor(Math.random() * (maxX - margin)) + margin;
    const randomY = Math.floor(Math.random() * (maxY - margin)) + margin;
    
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    
    return false;
}

// --- 2. LOGIC NGETIK ---
async function typeWriter(id, text, speed) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = ""; el.style.display = "block"; el.classList.add('text-reveal'); 
    for (let i = 0; i < text.length; i++) {
        el.innerHTML += text.charAt(i);
        await new Promise(res => setTimeout(res, speed));
    }
}

// --- 3. AUDIO CONTROL (FADE IN / FADE OUT) ---
function fadeOut(audio) {
    // Cek dulu kalo audio ga ada/error
    if (!audio || audio.paused) return;
    
    let vol = audio.volume;
    let interval = setInterval(() => {
        if (vol > 0.05) {
            vol -= 0.05; // Kurangi volume pelan-pelan
            audio.volume = vol;
        } else {
            // Kalo udah kecil banget, matiin total
            audio.volume = 0;
            audio.pause();
            clearInterval(interval);
        }
    }, 100); // Jalan setiap 0.1 detik
}

function fadeIn(audio, targetVol) {
    audio.volume = 0;
    let vol = 0;
    let interval = setInterval(() => {
        if (vol < targetVol) {
            vol += 0.02;
            audio.volume = Math.min(targetVol, vol);
        } else {
            clearInterval(interval);
        }
    }, 150);
}

// --- 4. SCENE 1 -> SCENE 2 ---
async function terimaMaaf() {
    const ambient = document.getElementById('ambientMusic');
    // Set volume awal piano
    ambient.currentTime = 100; 
    ambient.playbackRate = 0.9; 
    ambient.volume = 0.25; 
    ambient.play().catch(() => {});
    
    document.getElementById('content-wrapper').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('content-wrapper').style.display = 'none';
        const thankyouWrapper = document.getElementById('thankyou-card-wrapper');
        thankyouWrapper.style.display = 'flex';
        setTimeout(() => { thankyouWrapper.classList.add('show'); }, 50);
    }, 800);
    if (!audioCtx) { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
}

// --- 5. SCENE 2 -> WAITING -> SCENE 3 (VIDEO) ---
async function lanjutKeVideo() {
    const ambient = document.getElementById('ambientMusic'); 
    const music = document.getElementById('bgMusic');      
    const voice = document.getElementById('voiceAI');
    const scene = document.getElementById('dramatic-scene');
    const videoWrapper = document.querySelector('.video-wrapper-landscape');
    const videoEl = document.getElementById('us-video');
    const thankyouWrapper = document.getElementById('thankyou-card-wrapper');
    const loading = document.getElementById('loading-overlay'); 

    // [POINT PENTING]: Fade Out Piano dimulai DISINI (Saat tombol diklik)
    // Jadi pas masuk layar "waiting...", suaranya udah mengecil/ilang.
    fadeOut(ambient);

    if (audioCtx && audioCtx.state === 'suspended') { await audioCtx.resume(); }

    // Ilangin Surat
    thankyouWrapper.classList.remove('show');
    
    // Munculin Loading "waiting..."
    loading.style.display = 'flex';
    setTimeout(() => { loading.style.opacity = '1'; }, 100);

    setTimeout(() => {
        thankyouWrapper.style.display = 'none';
    }, 800);

    // Tahan di layar Waiting selama 3 detik (Suasana Hening)
    await new Promise(r => setTimeout(r, 1500)); 

    // Matikan Loading, Masuk Scene Video
    loading.style.opacity = '0';
    setTimeout(() => { loading.style.display = 'none'; }, 1000);
    
    scene.style.display = 'flex'; 
    setTimeout(() => { scene.style.opacity = '1'; }, 500);

    // Pastikan piano bener-bener mati (Safety)
    ambient.pause(); 
    ambient.volume = 0;

    // Setup Voice
    if (!voiceSource) {
        audioGain = audioCtx.createGain(); audioGain.gain.value = 4.0; 
        voiceSource = audioCtx.createMediaElementSource(voice);
        voiceSource.connect(audioGain); audioGain.connect(audioCtx.destination);
    }

    // Play Musik Utama (Fade In)
    music.currentTime = 204; 
    music.play(); 
    fadeIn(music, 0.5); 
    
    await new Promise(r => setTimeout(r, 2000)); 
    
    // Play Video
    videoEl.muted = true; videoEl.playbackRate = 0.65;
    videoEl.play().then(() => { videoWrapper.classList.add('show-video'); });
    voice.play();

    // Teks Ngetik
    const typoSpeed = 65; 
    await typeWriter("type1", "In the world of literature, there are countless beautiful verses, but none can truly capture how much you mean to me.", typoSpeed);
    await new Promise(r => setTimeout(r, 1000));
    
    await typeWriter("type2", "just like the lyrics in your photo, 'lights will guide you home'...", typoSpeed);
    await new Promise(r => setTimeout(r, 800));
    
    await typeWriter("type3", "i hope i can be one of those lights that always leads you back to where you feel safe and comfortable.", typoSpeed);
    await new Promise(r => setTimeout(r, 1200));
    
    await typeWriter("type4", "this is truly coming from the bottom of my heart. :)", typoSpeed);

    const footer = document.getElementById('final-footer');
    footer.style.display = 'block';
    setTimeout(() => { footer.style.opacity = '1'; }, 100);
    
    // --- ENDING ---
    let hasFadedOut = false;
    music.ontimeupdate = () => {
        if (music.currentTime >= 245 && !hasFadedOut) {
            hasFadedOut = true;
            music.ontimeupdate = null; 
            scene.style.opacity = '0'; 
            setTimeout(() => {
                scene.style.display = 'none'; 
                const replayScreen = document.getElementById('replay-screen');
                replayScreen.style.display = 'flex';
                setTimeout(() => { replayScreen.style.opacity = '1'; }, 100);
            }, 2000); 
        }
    };
}

// --- 6. CHAT WA ---
function chatWhatsApp() {
    const nomorHP = "0881036799054"; // GANTI NOMOR LU
    const pesan = "kakk, aku uda nonton videonya...";
    window.open(`https://wa.me/${nomorHP}?text=${encodeURIComponent(pesan)}`, '_blank');
}
