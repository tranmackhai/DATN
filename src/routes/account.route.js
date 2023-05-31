const { Router } = require("express");
const accountController = require("../controllers/account.controller.js");

const router = Router();
router.post("/", accountController.create);
router.get("/getAll", accountController.getAll);
router.get("/getById/:id", accountController.getById);
router.patch("/updateUser/:id", accountController.updateUser);

module.exports = router;
