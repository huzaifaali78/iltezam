const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "User is not Authorized" });
      }

      req.user = decoded;

      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "Authorization header is missing or invalid" });
  }
});

module.exports = validateToken;
