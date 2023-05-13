const { Router } = require("express");

const router = Router();
router.use("/auth", require("./auth.route"));

module.exports = router;
