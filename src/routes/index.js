const { Router } = require("express");

const router = Router();
router.use("/auth", require("./auth.route"));
router.use("/account", require("./account.route"));

module.exports = router;
