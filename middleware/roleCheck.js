/**
 * Role-based access control middleware
 * @param {Array} roles - Array of allowed roles
 * @returns {Function} Express middleware function
 */
const roleCheck = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Access denied. Insufficient permissions.' 
      });
    }
    
    next();
  };
};

module.exports = roleCheck; 