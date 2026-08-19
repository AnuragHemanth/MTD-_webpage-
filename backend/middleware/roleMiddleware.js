const roleMiddleware = (allowedRoles = []) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const normalizedAllowedRoles = allowedRoles.map((role) => String(role).toUpperCase());
  const userRole = String(req.user.role || '').toUpperCase();

  if (normalizedAllowedRoles.length && !normalizedAllowedRoles.includes(userRole)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
};

module.exports = roleMiddleware;
