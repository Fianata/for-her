/**
 * 1. LOGIKA TOMBOL RUN AWAY (ANTI-GHOST CLICK)
 */
function pindahTombol(e) {
    if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
    const btn = document.getElementById('btnEngga');
    btn.style.position = 'fixed';
    
    const maxX = window.innerWidth - btn.offsetWidth - 50;
    const maxY = window.innerHeight - btn.offsetHeight - 50;

    btn.style.left = Math.random() * maxX + 'px';
    btn.style.top = Math.random() * maxY + 'px';
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

function lokasiReload() { window.location.reload(); }

/**
 * 3. MAIN MOMENT (SYNCHRONIZED)
 */
async function terimaMaaf() {
    const music = document.getElementById('bgMusic');
    const voice = document.getElementById('voiceAI');
    const scene = document.getElementById('dramatic-scene');
    const videoWrapper = document.querySelector('.video-wrapper-landscape');
    const videoEl = document.getElementById('us-video');

    // SETUP AMPLIFIER (VOICE)
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(voice);
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 4.5; 
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // START MUSIC
    music.currentTime = 210; 
    music.volume = 0.55;
    music.play();

    // TRANSISI LAYAR
    document.getElementById('content-wrapper').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('content-wrapper').style.display = 'none';
        scene.style.display = 'grid'; // AKTIFKAN GRID MODE
    }, 800);

    // CINEMATIC SEQUENCE
    await new Promise(r => setTimeout(r, 2500)); 
    videoWrapper.classList.add('show-video');
    videoEl.playbackRate = 0.75; 
    videoEl.play();
    voice.play(); 

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
}

