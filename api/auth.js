const obfuscatedCode = btoa('cogitoergosum');  // Base64 encoding for basic obfuscation

async function submitCode() {
    const code = document.getElementById('code').value;
    const messageElement = document.getElementById('message');

    const isFleek = window.location.hostname.includes('fleek.app');
    
    if (isFleek) {
        if (btoa(code) === obfuscatedCode) {  // Compare encoded input
            messageElement.textContent = 'Access granted';
            messageElement.className = 'message success';
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('authVersion', currentVersion);
            window.location.href = '/';
        } else {
            messageElement.textContent = 'Invalid code';
            messageElement.className = 'message error';
        }
        return;
    }

    // Server-side authentication for Vercel/Netlify
    const fetchUrl = window.location.hostname.includes('netlify.app')
        ? '/.netlify/functions/auth'
        : '/api/auth';

    try {
        const response = await fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
        });

        const result = await response.json();

        if (response.ok) {
            messageElement.textContent = result.message;
            messageElement.className = 'message success';
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('authVersion', currentVersion);
            window.location.href = '/';
        } else {
            messageElement.textContent = result.message;
            messageElement.className = 'message error';
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.textContent = 'An error occurred.';
        messageElement.className = 'message error';
    }
}
