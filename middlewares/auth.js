const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = process.env.JWT_SECRET;
console.log(secret)
const expiration = "2h";

function authMiddleware(req, res, next) {
  // Allows token to be sent via req.body, req.query, or headers
  let token = req.body?.token || req.query?.token || req.headers?.authorization;
  // We split the token string into an array and return actual token
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }
  if (!token) {
    return next();
  }
  // If token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
  try {
    
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    console.log("data", data) 
    req.user = data;
  } catch {
    console.log("Invalid token");
  }
  next();
}


function adminOnly(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
}

module.exports = {
  authMiddleware,
  adminOnly
};
