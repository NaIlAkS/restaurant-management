// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware for authentication
exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    req.user = decoded; // Save user info for the next middleware
    next();
  });
};

// Middleware for role-based authorization
exports.authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role privileges' });
    }
    next();
  };
};
