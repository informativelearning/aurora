const currentVersion = 'v5';
const securityKey = [
    '98a2f', '7b3e1', '6c4d9', 'ae5f8', '2d1c7',
    '4e9b3', '8f7a2', '1d6c4', '5b3e8', '9a7f2'
].join('');

function createHash(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

function validateCode(input) {
    if (!input || input.length < 8) return false;
    const hashResult = createHash(input);
    const expectedHash = createHash('cogitoergosum');
    
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
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500));

        if (validateCode(code)) {
            messageElement.textContent = 'Access granted. Redirecting...';
            messageElement.className = 'message success';
            
            const timestamp = Date.now();
            const authToken = createHash(timestamp + securityKey);
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('authTimestamp', timestamp);
            localStorage.setItem('authVersion', currentVersion);
            
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

function verifyStoredAuth() {
    const storedToken = localStorage.getItem('authToken');
    const timestamp = localStorage.getItem('authTimestamp');
    const version = localStorage.getItem('authVersion');
    
    if (!storedToken || !timestamp || version !== currentVersion) {
        return false;
    }
    
    const expectedToken = createHash(timestamp + securityKey);
    return storedToken === expectedToken;
}

function checkAuthentication() {
    const isAuthenticated = verifyStoredAuth();
    
    if (isAuthenticated) {
        if (window.location.pathname === '/authentication.html') {
            window.location.href = '/';
        }
    } else {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTimestamp');
        localStorage.removeItem('authVersion');
        
        if (window.location.pathname !== '/authentication.html') {
            window.location.href = '/authentication.html';
        }
    }
}

checkAuthentication();
