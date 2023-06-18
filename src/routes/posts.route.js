const postsController = require("../controllers/posts.controller.js");
const { loginRequired } = require("../middlewares/auth.middleware.js");

const router = require("express").Router();

router.post("/create", loginRequired, postsController.create);
router.get("/getAll", loginRequired, postsController.getAll);
router.get("/getById/:id", loginRequired, postsController.getById);

module.exports = router;
