// Adjust the text to be typed and selector according to your needs
const text = "aurora."; // Adjust to your desired text
const typingDelay = 200; // Delay between each character
const initialDelay = 200; // Initial delay before typing starts

// Select the element with id 'typewriter'
const h1 = document.getElementById("typewriter"); // Ensure this matches the id in your HTML

// Function to handle the typing effect
function type() {
    setTimeout(() => {
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => {
                h1.textContent += text[i];
                // If typing is complete, hide any blinking element (if used)
                // Uncomment the following lines if you have a blinking element
                // const blinker = document.getElementById("blinking");
                // if (i === text.length - 1) {
                //   if (blinker) blinker.style.display = "none"; 
                // }
            }, i * typingDelay);
        }
    }, initialDelay);
}

// Call the function to start typing effect
type();
