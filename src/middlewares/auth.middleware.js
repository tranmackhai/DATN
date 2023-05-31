const jwt = require("jsonwebtoken");

const loginRequired = (req, res, next) => {
  // const headers = req.headers.authorization;
  // if (headers) {
  //   const [_, accessToken] = headers.split(" ");
  //   if (accessToken) {
  //     const user = jwt.verify(accessToken, process.env.ACCESSTOKEN);
  //     req.user = user;
  //     return next()
  //   }
  // }
  // next();
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
        if(user.role === "admin"){
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

module.exports = { loginRequired
  ,verifyAdmin };
