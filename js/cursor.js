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

    let currentIndex = 0;

    // Function to update the cursor effect position and image
    function updateCursorEffect(e) {
        cursorEffect.style.left = `${e.pageX}px`;
        cursorEffect.style.top = `${e.pageY}px`;

        // Change image on each move
        currentIndex = (currentIndex + 1) % images.length;
        cursorEffect.style.backgroundImage = `url(${images[currentIndex]})`;
    }

    // Set the initial image and position
    cursorEffect.style.backgroundImage = `url(${images[currentIndex]})`;
    cursorEffect.style.width = '80px'; // Adjust size as needed
    cursorEffect.style.height = '80px'; // Adjust size as needed

    // Update cursor position and image on mouse move
    document.addEventListener('mousemove', updateCursorEffect);
});
