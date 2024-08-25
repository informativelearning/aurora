// cursor.js
document.addEventListener('mousemove', function(e) {
    const cursorEffect = document.getElementById('cursor-effect');
    const images = [
        'images/schizoscribble1.png',
        'images/schizoscribble2.png',
        'images/schizoscribble3.png',
        'images/schizoscribble4.png',
        'images/schizoscribble5.png',
        'images/schizoscribble6.png',
        'images/schizoscribble7.png'
    ];

    let index = Math.floor(Math.random() * images.length);
    cursorEffect.style.backgroundImage = `url(${images[index]})`;
    cursorEffect.style.left = `${e.clientX}px`;
    cursorEffect.style.top = `${e.clientY}px`;
});
