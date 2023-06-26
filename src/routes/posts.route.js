const postsController = require("../controllers/posts.controller.js");
const { loginRequired } = require("../middlewares/auth.middleware.js");

const router = require("express").Router();

router.post("/create", loginRequired, postsController.create);
router.get("/getAll", loginRequired, postsController.getAll);
router.patch("/update/:slug", loginRequired, postsController.update);
router.get("/getById/:id", loginRequired, postsController.getById);
router.delete("/:id", loginRequired, postsController.delete);

module.exports = router;
