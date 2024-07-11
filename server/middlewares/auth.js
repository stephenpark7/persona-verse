const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"];
  
  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    req.userId = decoded.id;
    next();
  });
}
