const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  let token;
  console.log(req.cookies.jwt);
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
