// Variable Global untuk mencegah Double-Connection Audio
let audioCtx;
let voiceSource;
let audioGain;

/**
 * 1. LOGIKA TOMBOL RUN AWAY (ANTI-KABUR LAYAR)
 */
function pindahTombol(e) {
    if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
    const btn = document.getElementById('btnEngga');
    const daftarPesan = ["nt mell! 😜", "ngeyel! 🙄", "coba lagi! 😋", "pencet iyaa aja gasi!? 😡", "gabisa mel sori! 🤪"];
    btn.innerText = daftarPesan[Math.floor(Math.random() * daftarPesan.length)];
    
    btn.style.position = 'fixed';
    
    // SAFE ZONE LOGIC
    const padding = 25; 
    const maxX = window.innerWidth - btn.offsetWidth - padding;
    const maxY = window.innerHeight - btn.offsetHeight - padding;

    // Koordinat random terkunci di dalam Viewport
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    
    return false;
}

/**
 * 2. TYPEWRITER EFFECT
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
 * 3. MAIN FUNCTION (STABLE AUDIO ENGINE)
 */
async function terimaMaaf() {
    const music = document.getElementById('bgMusic');
    const voice = document.getElementById('voiceAI');
    const scene = document.getElementById('dramatic-scene');
    const videoWrapper = document.querySelector('.video-wrapper-landscape');
    const videoEl = document.getElementById('us-video');
    const replayScreen = document.getElementById('replay-screen');

    // --- AUDIO CONTEXT SETUP (BOOST NARASI 4.5X) ---
    
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            audioGain = audioCtx.createGain();
            audioGain.gain.value = 4.5; 
            
            voiceSource = audioCtx.createMediaElementSource(voice);
            voiceSource.connect(audioGain);
            audioGain.connect(audioCtx.destination);
        }

        // PAKSA RESUME: Kunci agar suara muncul di Safari/iPhone
        if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
        }
    } catch (e) {
        console.log("Audio Engine error:", e);
    }

    // START MUSIC (FIX YOU)
    music.currentTime = 210; 
    music.volume = 0.5;
    music.play().catch(e => console.log("Music blocked by browser"));

    // UI TRANSITION
    document.getElementById('content-wrapper').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('content-wrapper').style.display = 'none';
        scene.style.display = 'flex'; 
    }, 800);

    // MOMEN SINEMATIK
    await new Promise(r => setTimeout(r, 2500)); 
    videoWrapper.classList.add('show-video');
    videoEl.playbackRate = 0.75; 
    videoEl.play();
    
    // PLAY NARASI (GEORGE)
    voice.play().catch(e => voice.play());

    const typoSpeed = 69; 
    await typeWriter("type1", "In the world of literature, there are countless beautiful verses, but none can truly capture how much you mean to me.", typoSpeed);
    await new Promise(r => setTimeout(r, 1000));
    await typeWriter("type2", "just like the lyrics in your photo, 'lights will guide you home'...", typoSpeed);
    await new Promise(r => setTimeout(r, 800));
    // NEON PINK PART
    await typeWriter("type3", "i hope i can be one of those lights that always leads you back to where you feel safe and comfortable.", typoSpeed);
    await new Promise(r => setTimeout(r, 1200));
    await typeWriter("type4", "this is truly coming from the bottom of my heart. :)", typoSpeed);

    voice.onended = () => {
        document.getElementById('final-footer').style.display = 'block';
    };

    setTimeout(() => {
        const footer = document.getElementById('final-footer');
        if (footer) {
            footer.style.display = 'block';
            // Paksa opacity ke 1 biar kelihatan kalau pake transition
            setTimeout(() => { footer.style.opacity = '1'; }, 50);
        }
    }, 1000); // Kasih jeda 1 detik biar estetik setelah kalimat terakhir muncul
}

    // AUTO-FINISH (Detik 276 Musik)
    music.ontimeupdate = () => {
        if (music.currentTime >= 275) { 
            scene.style.display = 'none';
            replayScreen.style.display = 'flex';
            setTimeout(() => { replayScreen.style.opacity = '1'; }, 100);
        }
    };
}

