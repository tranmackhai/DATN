const categoryController = require("../controllers/category.controller.js");

const router = require("express").Router();

router.post("/create", categoryController.create);
router.get("/getAll", categoryController.getAll);
router.get("/search", categoryController.search);
router.patch("/update/:slug", categoryController.update);
router.get("/getByUser", categoryController.getByUser);
router.delete("/:id", categoryController.delete);

module.exports = router;
