let audioCtx;
let voiceSource;
let audioGain;

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

async function typeWriter(id, text, speed) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = ""; 
    el.classList.add('text-reveal'); 
    for (let i = 0; i < text.length; i++) {
        el.innerHTML += text.charAt(i);
        await new Promise(res => setTimeout(res, speed));
    }
}

function fadeOut(audio, callback) {
    let vol = audio.volume;
    let interval = setInterval(() => {
        if (vol > 0.05) {
            vol -= 0.05; 
            audio.volume = Math.max(0, vol);
        } else {
            audio.volume = 0;
            audio.pause();
            clearInterval(interval);
            if (callback) callback();
        }
    }, 100); 
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

async function terimaMaaf() {
    const ambient = document.getElementById('ambientMusic');
    ambient.currentTime = 100;
    ambient.playbackRate = 0.9;
    ambient.volume = 0.25;
    ambient.play().catch(() => { console.log("Autoplay blocked"); });

    document.getElementById('content-wrapper').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('content-wrapper').style.display = 'none';
        const thankyouWrapper = document.getElementById('thankyou-card-wrapper');
        thankyouWrapper.style.display = 'flex';
        setTimeout(() => { thankyouWrapper.classList.add('show'); }, 50);
    }, 800);

    if (!audioCtx) { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
}

async function lanjutKeVideo() {
    const ambient = document.getElementById('ambientMusic'); 
    const music = document.getElementById('bgMusic');      
    const voice = document.getElementById('voiceAI');
    const scene = document.getElementById('dramatic-scene');
    const videoWrapper = document.querySelector('.video-wrapper-landscape');
    const videoEl = document.getElementById('us-video');
    const thankyouWrapper = document.getElementById('thankyou-card-wrapper');

    fadeOut(ambient);

    if (audioCtx && audioCtx.state === 'suspended') { await audioCtx.resume(); }

    thankyouWrapper.classList.remove('show');
    setTimeout(() => {
        thankyouWrapper.style.display = 'none';
        scene.style.display = 'flex'; 
    }, 800);

    await new Promise(r => setTimeout(r, 2500)); 

    ambient.pause();
    ambient.volume = 0;

    if (!voiceSource) {
        audioGain = audioCtx.createGain();
        audioGain.gain.value = 4.0; 
        voiceSource = audioCtx.createMediaElementSource(voice);
        voiceSource.connect(audioGain);
        audioGain.connect(audioCtx.destination);
    }

    music.currentTime = 204; 
    music.play();
    fadeIn(music, 0.5); 

    await new Promise(r => setTimeout(r, 2000)); 
    
    videoEl.muted = true;
    videoEl.playbackRate = 0.65;
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

    const footer = document.getElementById('final-footer');
    footer.style.display = 'block';
    setTimeout(() => { footer.style.opacity = '1'; }, 100);
    
    let hasFadedOut = false;
    music.ontimeupdate = () => {
        if (music.currentTime >= 246 && !hasFadedOut) {
            hasFadedOut = true;
            music.ontimeupdate = null;
            scene.style.opacity = '0'; 

            fadeOut(music, () => {
                setTimeout(() => {
                    scene.style.display = 'none';
                    document.getElementById('replay-screen').style.display = 'flex';
                    setTimeout(() => { document.getElementById('replay-screen').style.opacity = '1'; }, 150);
                }, 1100);
            });
        }
    };
}
