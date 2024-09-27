// api/auth.js 

// Ideally, you can store this in an environment variable
// You can change this without redeploying if using environment variables.
const VALID_CODE = process.env.AUTH_CODE || 'rqgp7vdt7zy';  // Update with the new code

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { code } = req.body;
    
    // Compare the entered code with the valid code
    if (code === VALID_CODE) {
      res.status(200).json({ 
        message: 'Access granted', 
        version: 'v3'  // Update the version here as well
      });
    } else {
      res.status(403).json({ message: 'PAY FOR THE FUCKING WEBSITE YOU MONGREL' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
