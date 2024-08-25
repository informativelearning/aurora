document.addEventListener('DOMContentLoaded', () => {
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

    let currentImageIndex = 0;
    
    function updateCursorEffect(e) {
        const { clientX: x, clientY: y } = e;
        cursorEffect.style.left = `${x - cursorEffect.offsetWidth / 2}px`;
        cursorEffect.style.top = `${y - cursorEffect.offsetHeight / 2}px`;
    }

    function setRandomImage() {
        currentImageIndex = Math.floor(Math.random() * images.length);
        cursorEffect.style.backgroundImage = `url(${images[currentImageIndex]})`;
    }

    setRandomImage();
    setInterval(setRandomImage, 1000); // Change image every second

    document.addEventListener('mousemove', updateCursorEffect);
});
