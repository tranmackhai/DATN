const { Router } = require("express");

const router = Router();
router.use("/auth", require("./auth.route"));
router.use("/account", require("./account.route"));
router.use("/news", require("./news.route"));
router.use("/category", require("./category.route"));
router.use("/posts", require("./posts.route"));
router.use("/upload", require("./upload.route"));

module.exports = router;
