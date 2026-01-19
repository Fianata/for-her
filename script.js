function pindahTombol() {
    const btn = document.getElementById('btnEngga');
    btn.style.position = 'fixed';

    const width = window.innerWidth;
    const height = window.innerHeight;

    const margin = 100;
    const maxX = width - btn.offsetWidth - margin;
    const maxY = height - btn.offsetHeight - margin;

    const randomX = Math.floor(Math.random() * maxX) + (margin / 2);
    const randomY = Math.floor(Math.random() * maxY) + (margin / 2);

    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';

    const messages = ["nt mell! 😜", "dibilang percumaa! 😡", "jangan nyerahhhh 😜", "ngeyel banget sii! 🙄", "sekali lagi mell! 😜"];
    btn.innerText = messages[Math.floor(Math.random() * messages.length)];
}

function terimaMaaf() {
    document.getElementById('mainCard').style.display = 'none';
    const btnEngga = document.getElementById('btnEngga');
    if(btnEngga) btnEngga.style.display = 'none';
    document.getElementById('successCard').style.display = 'block';
}

