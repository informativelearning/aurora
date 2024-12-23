// auth.js - Main authentication handler
const currentVersion = 'v5';  // Version tracking for authentication

// Function to check if running on Fleek platform
function isFleekPlatform() {
    // Check multiple possible Fleek domains to make detection more reliable
    return window.location.hostname.includes('fleek') || 
           window.location.hostname.includes('on-fleek') ||
           window.location.hostname.endsWith('.app');
}

// Function to get the appropriate authentication endpoint
function getAuthEndpoint() {
    if (isFleekPlatform()) {
        return '/api/fleek-auth';  // Fleek serverless function endpoint
    } else if (window.location.hostname.includes('netlify.app')) {
        return '/.netlify/functions/auth';  // Netlify function endpoint
    } else {
        return '/api/auth';  // Default/Vercel endpoint
    }
}

// Main authentication function
async function submitCode() {
    const code = document.getElementById('code').value;
    const messageElement = document.getElementById('message');
    
    // Don't proceed if code is empty
    if (!code.trim()) {
        messageElement.textContent = 'Please enter a code';
        messageElement.className = 'message error';
        return;
    }

    try {
        // Make the authentication request
        const response = await fetch(getAuthEndpoint(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code })
        });

        const result = await response.json();

        if (response.ok) {
            // Success flow
            messageElement.textContent = 'Access granted. Redirecting...';
            messageElement.className = 'message success';
            
            // Store authentication state
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('authVersion', currentVersion);
            
            // Add a small delay before redirect for better UX
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        } else {
            // Error flow
            messageElement.textContent = result.message || 'Invalid code';
            messageElement.className = 'message error';
            
            // Clear the input field for security
            document.getElementById('code').value = '';
        }
    } catch (error) {
        console.error('Authentication error:', error);
        messageElement.textContent = 'An error occurred. Please try again.';
        messageElement.className = 'message error';
    }
}

// Function to check if user is already authenticated
function checkAuthentication() {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    const storedVersion = localStorage.getItem('authVersion');
    
    if (isAuthenticated && storedVersion === currentVersion) {
        // User is authenticated with current version
        if (window.location.pathname === '/authentication.html') {
            window.location.href = '/';  // Redirect to home if on auth page
        }
    } else {
        // Clear any outdated authentication
        localStorage.removeItem('authenticated');
        localStorage.removeItem('authVersion');
        
        // Redirect to authentication page if not already there
        if (window.location.pathname !== '/authentication.html') {
            window.location.href = '/authentication.html';
        }
    }
}

// Event listener for Enter key in password field
document.getElementById('code')?.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        submitCode();
    }
});

// Run authentication check when script loads
checkAuthentication();