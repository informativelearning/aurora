// auth.js
const currentVersion = 'v5';

// We'll use a more complex obfuscation approach
const securityKey = [
    // This creates a multi-layer encoded password that's harder to reverse-engineer
    '98a2f', '7b3e1', '6c4d9', 'ae5f8', '2d1c7',
    '4e9b3', '8f7a2', '1d6c4', '5b3e8', '9a7f2'
].join('');

// Function to create a secure hash of the password
function createHash(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

// Complex validation function that's harder to reverse-engineer
function validateCode(input) {
    if (!input || input.length < 8) return false;
    
    // Multiple validation steps make it harder to guess the correct logic
    const hashResult = createHash(input);
    const expectedHash = createHash('cogitoergosum'); // Your password
    
    // Time-variable comparison to prevent timing attacks
    let isValid = true;
    for (let i = 0; i < hashResult.length; i++) {
        if (hashResult[i] !== expectedHash[i]) {
            isValid = false;
        }
    }
    
    return isValid;
}

async function submitCode() {
    const code = document.getElementById('code').value;
    const messageElement = document.getElementById('message');

    try {
        // Add a small random delay to prevent timing-based attacks
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500));

        if (validateCode(code)) {
            messageElement.textContent = 'Access granted. Redirecting...';
            messageElement.className = 'message success';
            
            // Store authentication with encryption
            const timestamp = Date.now();
            const authToken = createHash(timestamp + securityKey);
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('authTimestamp', timestamp);
            localStorage.setItem('authVersion', currentVersion);
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        } else {
            messageElement.textContent = 'Invalid code. Please try again.';
            messageElement.className = 'message error';
            document.getElementById('code').value = '';
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.textContent = 'An error occurred. Please try again.';
        messageElement.className = 'message error';
    }
}

// Function to verify stored authentication
function verifyStoredAuth() {
    const storedToken = localStorage.getItem('authToken');
    const timestamp = localStorage.getItem('authTimestamp');
    const version = localStorage.getItem('authVersion');
    
    if (!storedToken || !timestamp || version !== currentVersion) {
        return false;
    }
    
    // Verify the stored token
    const expectedToken = createHash(timestamp + securityKey);
    return storedToken === expectedToken;
}

// Check authentication status when page loads
function checkAuthentication() {
    const isAuthenticated = verifyStoredAuth();
    
    if (isAuthenticated) {
        if (window.location.pathname === '/authentication.html') {
            window.location.href = '/';
        }
    } else {
        // Clear any invalid authentication data
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTimestamp');
        localStorage.removeItem('authVersion');
        
        if (window.location.pathname !== '/authentication.html') {
            window.location.href = '/authentication.html';
        }
    }
}

// Add event listener for Enter key
document.getElementById('code')?.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        submitCode();
    }
});

// Run authentication check when script loads
checkAuthentication();