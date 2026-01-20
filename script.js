function pindahTombol(e) {
    if (e) { e.stopPropagation(); e.preventDefault(); }
    const btn = document.getElementById('btnEngga');
    btn.style.position = 'fixed';
    const maxX = window.innerWidth - btn.offsetWidth - 50;
    const maxY = window.innerHeight - btn.offsetHeight - 50;
    btn.style.left = Math.random() * maxX + 'px';
    btn.style.top = Math.random() * maxY + 'px';
}

async function typeWriter(id, text, speed) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = ""; 
    for (let i = 0; i < text.length; i++) {
        el.innerHTML += text.charAt(i);
        await new Promise(res => setTimeout(res, speed));
    }
}

async function terimaMaaf() {
    const music = document.getElementById('bgMusic');
    const voice = document.getElementById('voiceAI');
    const scene = document.getElementById('dramatic-scene');
    const videoWrapper = document.querySelector('.video-wrapper-landscape');
    const videoEl = document.getElementById('us-video');

    // Amplifier Voice
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(voice);
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 4.5; 
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    music.currentTime = 210; 
    music.volume = 0.5;
    music.play();

    document.getElementById('content-wrapper').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('content-wrapper').style.display = 'none';
        scene.style.display = 'flex';
    }, 800);

    await new Promise(r => setTimeout(r, 2000)); 
    videoWrapper.classList.add('show-video');
    videoEl.play();
    voice.play(); 

    const typoSpeed = 69; 
    await typeWriter("type1", "In the world of literature, there are countless beautiful verses, but none can truly capture how much you mean to me.", typoSpeed);
    await new Promise(r => setTimeout(r, 1000));
    await typeWriter("type2", "Just like the lyrics in your photo, 'Lights will guide you home'...", typoSpeed);
    await new Promise(r => setTimeout(r, 800));
    await typeWriter("type3", "I hope I can be one of those lights that always leads you back to where you feel safe and comfortable.", typoSpeed);
    await new Promise(r => setTimeout(r, 1200));
    await typeWriter("type4", "This is truly coming from the bottom of my heart. :)", typoSpeed);

    voice.onended = () => { document.getElementById('final-footer').style.display = 'block'; };
}
