const { loginRequired } = require("../middlewares/auth.middleware.js");
const newsController = require("../controllers/news.controller.js");

const router = require("express").Router();

router.post("/create", newsController.create);
router.get("/getAll", newsController.getAll);
router.get("/search", newsController.search);
router.patch("/updateStatus/:slug", newsController.updateStatus);
router.get("/getByUser", loginRequired, newsController.getByUser);
router.delete("/:id", loginRequired, newsController.delete);

module.exports = router;
