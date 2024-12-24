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
    if (!input || input.length < 8) {
        console.log('Validation failed: Code too short.');
        return false;
    }
    const hashedInput = createHash(input);
    const expectedHash = createHash('cogitoergosum');
    console.log('Input Hash:', hashedInput);
    console.log('Expected Hash:', expectedHash);
    return hashedInput === expectedHash;
}

async function submitCode() {
    const code = document.getElementById('code').value;
    const messageElement = document.getElementById('message');

    console.log('Submitted Code:', code);
    
    try {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500));

        if (validateCode(code)) {
            console.log('Validation successful. Granting access...');

            messageElement.textContent = 'Access granted. Redirecting...';
            messageElement.className = 'message success';
            
            const timestamp = Date.now();
            const authToken = createHash(timestamp + securityKey);
            
            // Debugging authentication data before storage
            console.log('Generated Auth Token:', authToken);
            console.log('Current Timestamp:', timestamp);
            console.log('Storing Authentication Version:', currentVersion);
            
            // Store authentication data
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('authTimestamp', timestamp);
            localStorage.setItem('authVersion', currentVersion);
            
            console.log('Authentication data stored. Redirecting to homepage...');
            window.location.href = '/';
        } else {
            console.log('Validation failed. Invalid code.');
            messageElement.textContent = 'Invalid code. Please try again.';
            messageElement.className = 'message error';
            document.getElementById('code').value = '';
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        messageElement.textContent = 'An error occurred. Please try again.';
        messageElement.className = 'message error';
    }
}
