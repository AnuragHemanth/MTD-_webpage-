const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    id: user.id || user._id,
    email: user.email,
    role: user.role,
    accountStatus: user.accountStatus
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'development-secret', {
    expiresIn: '7d'
  });
};

module.exports = generateToken;
