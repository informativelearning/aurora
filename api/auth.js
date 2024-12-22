// api/auth.js

// Ideally, store this in environment variables for security
const VALID_CODE = process.env.AUTH_CODE || 'cogitoergosum';  // Authentication code
const AUTH_VERSION = process.env.AUTH_VERSION || 'v5';        // Force re-authentication version

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { code } = req.body;

    // Detect if running on Fleek
    const isFleek = req.headers.host.includes('fleek.co');

    // Fleek - Handle password check entirely on the client-side
    if (isFleek) {
      res.status(405).json({ message: 'Client-side authentication only on Fleek.' });
      return;
    }

    // Vercel/Netlify - Perform server-side auth
    if (code === VALID_CODE) {
      res.status(200).json({ 
        message: 'Access granted', 
        version: AUTH_VERSION
      });
    } else {
      res.status(403).json({ message: 'PAY FOR THE FUCKING WEBSITE YOU MONGREL(Please and thank you😊😃)' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
