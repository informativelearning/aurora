document.addEventListener('mousemove', function (e) {
    var cursorEffect = document.getElementById('cursor-effect');
    // Position the cursor effect
    cursorEffect.style.left = (e.clientX - cursorEffect.clientWidth / 2) + 'px';
    cursorEffect.style.top = (e.clientY - cursorEffect.clientHeight / 2) + 'px';
});

// Set a random image for the cursor effect from the available images
function setRandomCursorImage() {
    var images = [
        'images/schizoscribble1.png',
        'images/schizoscribble2.png',
        'images/schizoscribble3.png',
        'images/schizoscribble4.png',
        'images/schizoscribble5.png',
        'images/schizoscribble6.png',
        'images/schizoscribble7.png'
    ];
    var randomImage = images[Math.floor(Math.random() * images.length)];
    var cursorEffect = document.getElementById('cursor-effect');
    cursorEffect.style.backgroundImage = 'url(' + randomImage + ')';
}

// Set a random image on page load
setRandomCursorImage();
