// api/auth.js

export default function handler(req, res) {
  const VALID_CODE = '!@4002naoiR';

  if (req.method === 'POST') {
    const { code } = req.body;
    if (code === VALID_CODE) {
      res.status(200).json({ message: 'Access granted' });
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}