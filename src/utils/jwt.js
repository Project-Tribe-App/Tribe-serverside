const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

const generateToken = (userName) => {
  return jwt.sign({ id: userName }, JWT_SECRET, { expiresIn: '1d' });
};

const genereateRefreshToken = (userName) => {
  return jwt.sign({ id: userName }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, genereateRefreshToken, verifyRefreshToken, verifyToken };
