const jwt = require("jsonwebtoken");

const loginRequired = (req, res, next) => {
  const reqHeader = req.headers["authorization"];
  if (reqHeader) {
    const accessToken = reqHeader.split(" ")[1];
    if (accessToken) {
      try {
        const user = jwt.verify(
          accessToken,
          process.env.ACCESSTOKEN || "super-serect"
        );
        req.user = user;
        return next();
      } catch (error) {
        console.log(error);
      }
    }
  }
  return res.status(401).json({
    message: "Unauthorized",
  });
};

const verifyAccountIdAndAdmin = (req, res, next) => {
  loginRequired(req, res, () => {
    if (+req.params.id === req.user.id || req.user.is_admin) {
      return next();
    } else {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  const reqHeader = req.headers["authorization"];
  if (reqHeader) {
    const accessToken = reqHeader.split(" ")[1];
    if (accessToken) {
      try {
        const user = jwt.verify(
          accessToken,
          process.env.ACCESSTOKEN || "super-serect"
        );
        req.user = user;
        if (user.is_admin === "admin") {
          return next();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return res.status(401).json({
    message: "Unauthorized",
  });
};

module.exports = { loginRequired, verifyAdmin, verifyAccountIdAndAdmin };
