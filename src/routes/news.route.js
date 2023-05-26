const newsController = require("../controllers/news.controller.js");

const router = require("express").Router();

router.post("/create", newsController.create);
router.get("/getAll", newsController.getAll);
router.patch("/updateStatus/:slug", newsController.updateStatus);

module.exports = router;
