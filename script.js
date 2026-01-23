let audioCtx;
let voiceSource;
let audioGain;

// --- 1. LOGIC TOMBOL LARI (VERSI KE-KURUNG DI KARTU) ---
function pindahTombol(e) {
    if (e) { e.stopPropagation(); e.preventDefault(); }
    
    const btn = document.getElementById('btnEngga');
    const card = document.getElementById('mainCard'); // Area kandang (Kartu)
    
    const daftarPesan = ["nt mell! 😜", "ngeyel! 🙄", "coba lagi! 😋", "pencet iyaa aja gasi!? 😡", "gabisa mel sori! 🤪"];
    
    // Ganti Teks
    btn.innerText = daftarPesan[Math.floor(Math.random() * daftarPesan.length)];
    
    // --- STEP PENTING: PINDAHIN TOMBOL KE DALAM CARD ---
    // Biar koordinatnya dihitung berdasarkan kartu, bukan layar HP
    if (btn.parentNode !== card) {
        card.appendChild(btn);
    }
    
    // Ubah posisi jadi Absolute
    btn.style.position = 'absolute';
    btn.style.zIndex = '100'; 
    
    // Hitung area aman (di dalam kartu)
    const margin = 30; // Jarak aman dari pinggir biar ga mepet
    const cardWidth = card.clientWidth;
    const cardHeight = card.clientHeight;
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;
    
    // Batas Maksimal Gerak
    const maxX = cardWidth - btnWidth - margin;
    const maxY = cardHeight - btnHeight - margin;
    
    // Acak posisi (Math.random)
    const randomX = Math.floor(Math.random() * (maxX - margin)) + margin;
    const randomY = Math.floor(Math.random() * (maxY - margin)) + margin;
    
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    
    return false;
}

// --- 2. LOGIC NGETIK BIASA (PER HURUF) ---
async function typeWriter(id, text, speed) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = ""; 
    el.style.display = "block"; 
    el.classList.add('text-reveal'); 
    for (let i = 0; i < text.length; i++) {
        el.innerHTML += text.charAt(i);
        await new Promise(res => setTimeout(res, speed));
    }
}

// --- 3. AUDIO HELPERS ---
function fadeOut(audio, callback) {
    let vol = audio.volume;
    let interval = setInterval(() => {
        if (vol > 0.05) { vol -= 0.05; audio.volume = Math.max(0, vol); } 
        else { audio.volume = 0; audio.pause(); clearInterval(interval); if (callback) callback(); }
    }, 100); 
}

function fadeIn(audio, targetVol) {
    audio.volume = 0; let vol = 0;
    let interval = setInterval(() => {
        if (vol < targetVol) { vol += 0.02; audio.volume = Math.min(targetVol, vol); } 
        else { clearInterval(interval); }
    }, 150);
}

// --- 4. SCENE 1 -> SCENE 2 (SURAT) ---
async function terimaMaaf() {
    const ambient = document.getElementById('ambientMusic');
    ambient.currentTime = 100; ambient.playbackRate = 0.9; ambient.volume = 0.25;
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

// --- 5. SCENE 2 -> SCENE 3 (VIDEO) -> ENDING ---
async function lanjutKeVideo() {
    const ambient = document.getElementById('ambientMusic'); 
    const music = document.getElementById('bgMusic');      
    const voice = document.getElementById('voiceAI');
    const scene = document.getElementById('dramatic-scene');
    const videoWrapper = document.querySelector('.video-wrapper-landscape');
    const videoEl = document.getElementById('us-video');
    const thankyouWrapper = document.getElementById('thankyou-card-wrapper');

    // Transisi Awal
    fadeOut(ambient);
    if (audioCtx && audioCtx.state === 'suspended') { await audioCtx.resume(); }

    thankyouWrapper.classList.remove('show');
    setTimeout(() => {
        thankyouWrapper.style.display = 'none';
        scene.style.display = 'flex'; 
        scene.style.opacity = '1';
    }, 800);

    // Layar Hitam (Dramatic Pause 2.5s)
    await new Promise(r => setTimeout(r, 2500)); 
    ambient.pause(); ambient.volume = 0;

    // Setup Voice Booster
    if (!voiceSource) {
        audioGain = audioCtx.createGain(); audioGain.gain.value = 4.0; 
        voiceSource = audioCtx.createMediaElementSource(voice);
        voiceSource.connect(audioGain); audioGain.connect(audioCtx.destination);
    }

    // Play Musik (Menit 3:24)
    music.currentTime = 204; music.play(); fadeIn(music, 0.5); 
    await new Promise(r => setTimeout(r, 2000)); 
    
    // Play Video & Voice
    videoEl.muted = true; videoEl.playbackRate = 0.65;
    videoEl.play().then(() => { videoWrapper.classList.add('show-video'); });
    voice.play();

    // Animasi Teks Ngetik (Biasa)
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
    
    // --- ENDING TRANSITION (POLAROID) ---
    let hasFadedOut = false;
    music.ontimeupdate = () => {
        // Cek Menit 4:05 (245 detik)
        if (music.currentTime >= 245 && !hasFadedOut) {
            hasFadedOut = true;
            music.ontimeupdate = null; 

            // 1. Fade Out Visual (Layar Gelap)
            scene.style.opacity = '0'; 

            // 2. Munculin Ending Screen (Musik tetep jalan)
            setTimeout(() => {
                scene.style.display = 'none'; 
                const replayScreen = document.getElementById('replay-screen');
                replayScreen.style.display = 'flex';
                setTimeout(() => { replayScreen.style.opacity = '1'; }, 100);
            }, 2000); 
        }
    };
}

// --- 6. FUNGSI CHAT WA (TAMBAHAN) ---
function chatWhatsApp() {
    // ⚠️ GANTI NOMOR DI BAWAH INI JADI NOMOR LU (628...)
    const nomorHP = "0881036799054"; 
    
    const pesan = "kak, aku udaa nonton videonya...";
    window.open(`https://wa.me/${nomorHP}?text=${encodeURIComponent(pesan)}`, '_blank');
}
