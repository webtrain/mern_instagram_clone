var jwt = require('jsonwebtoken');

const createAccessToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};

const createRefreshToken = (id) => {
  return jwt.sign(id, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
};

module.exports = { createAccessToken, createRefreshToken };
