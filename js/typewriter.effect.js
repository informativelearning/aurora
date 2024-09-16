const text = "aurora."; // Text to be typed out
const typingDelay = 200; // Delay between each character
const initialDelay = 200; // Initial delay before typing starts

// Select the elements
const h1 = document.getElementById("typewriter"); // Ensure this matches the id in your HTML
const blinker = document.createElement("span"); // Create the blinking cursor element
blinker.id = "blinking";
blinker.textContent = "|"; // You can change this to any character for the cursor
blinker.style.display = "inline-block";
blinker.style.animation = "blink-caret 0.75s step-end infinite";

// Add the blinking cursor element to the h1
h1.appendChild(blinker);

function type() {
    setTimeout(() => {
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => {
                // Append the current character to the h1 text
                h1.childNodes[0].textContent += text[i];
                // Hide the blinking cursor when typing is complete
                if (i === text.length - 1) {
                    blinker.style.display = "none";
                }
            }, i * typingDelay);
        }
    }, initialDelay);
}

// Call the function to start typing effect
type();

// CSS for blinking cursor animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes blink-caret {
        from, to {
            border-color: transparent;
        }
        50% {
            border-color: #22c55e; /* Match the color with your neon effect */
        }
    }
`;
document.head.appendChild(style);
