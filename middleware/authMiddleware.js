const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;

    try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedData;
      return next();
    } catch (err) {
      return next(err);
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, token not found",
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `You don't have access for this endpoint`,
      });
    }
    next();
  };
};

// exports.authorizeAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({
//       message: `You don't have access for this endpoint`,
//     });
//   }
//   next();
// };