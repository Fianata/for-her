function pindahTombol() {
    const btn = document.getElementById('btnEngga');
    
    // Padding lebih gede biar ga terlalu mojok di HP
    const padding = 80;
    
    const maxX = window.innerWidth - btn.offsetWidth - padding;
    const maxY = window.innerHeight - btn.innerHeight - padding;
    
    const randomX = Math.max(padding/2, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding/2, Math.floor(Math.random() * maxY));
    
    // Tambahin transisi smooth di JS juga biar aman
    btn.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    
    // Respon makin banyak wkwk
    const texts = [
        "not today, bestie! 💅", 
        "nice try! 😜✨", 
        "still nope! 🙅‍♀️", 
        "too slow! 💨",
        "oops, missed! 🎀"
    ];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    btn.innerText = randomText;
}

function terimaMaaf() {
    const main = document.getElementById('mainCard');
    const success = document.getElementById('successCard');
    
    // Efek fade out simpel
    main.style.opacity = '0';
    main.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        main.style.display = 'none';
        success.style.display = 'block';
        // Efek fade in
        success.style.opacity = '0';
        setTimeout(() => {
            success.style.transition = 'opacity 0.5s ease';
            success.style.opacity = '1';
        }, 50);
    }, 500);
}