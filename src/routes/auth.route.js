const authController = require("../controllers/auth.controller.js");
const {  loginRequired } = require("../middlewares/auth.middleware.js");

const router = require("express").Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refreshToken", authController.refreshToken);
router.get("/getProfile", loginRequired, authController.getProfile);
router.patch("/changePassword", loginRequired, authController.changePassword);
router.patch("/changeProfile", loginRequired, authController.changeProfile);

module.exports = router;
