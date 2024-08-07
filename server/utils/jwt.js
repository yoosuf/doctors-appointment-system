const jwt = require('jsonwebtoken');

const token = 'your_jwt_token_here'; // Replace this with your actual JWT token

// Replace 'your_secret_key_here' with the secret key used to sign the JWT
const secretKey = 'your_secret_key_here';

jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('JWT verification error:', err);

    // Check if the error is due to token expiration
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }

    // Handle other verification errors
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Check if the token is expired
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (decoded.exp && decoded.exp < currentTimestamp) {
    return res.status(401).json({ error: 'Token expired' });
  }

  // Token is valid, return the decoded object
  return res.status(200).json({ decoded });
});
