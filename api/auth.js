// api/auth.js
export default function handler(req, res) {
  const AUTH_CODE = '!@4002naoiR';
  const code = req.headers['authorization'];
  
  if (code === AUTH_CODE) {
    res.status(200).send('This is protected content.');
  } else {
    res.status(403).send('Forbidden');
  }
}
