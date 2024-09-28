// api/auth.js

// Ideally, store this in environment variables for security
const VALID_CODE = process.env.AUTH_CODE || 'rqgp7vdt7zy';  // Authentication code from environment variable or fallback

// Version for invalidating authentication; update this to invalidate all authenticated users
const AUTH_VERSION = process.env.AUTH_VERSION || 'v4';  // Change this version to force re-authentication

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { code } = req.body;
    
    // Compare the entered code with the valid code
    if (code === VALID_CODE) {
      res.status(200).json({ 
        message: 'Access granted', 
        version: AUTH_VERSION  // Send the current authentication version back to the client
      });
    } else {
      res.status(403).json({ message: 'Invalid code. Please try again.' });
    }
  } else {
    // Method not allowed if not a POST request
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
