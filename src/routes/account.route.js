const { Router } = require("express");
const accountController = require("../controllers/account.controller.js");
const {
  verifyAccountIdAndAdmin,
} = require("../middlewares/auth.middleware.js");

const router = Router();
router.post("/", accountController.create);
router.get("/createAdmin", accountController.createAdmin);
router.get("/getAll", accountController.getAll);
router.get("/search", accountController.search);
router.get("/getById/:id", verifyAccountIdAndAdmin, accountController.getById);
router.patch("/updateUser/:id", accountController.updateUser);

module.exports = router;
