const { Router } = require ("express");
const  accountController = require ("../controllers/account.controller.js");

const router = Router();
router.get("/", accountController.create);

module.exports = router;
