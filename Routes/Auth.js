const express = require("express");
const router = express.Router();
const authController = require("../Controllers/Auth");

router.post("/createUser", authController.createUser);
router.post("/login", authController.login);

module.exports = router;
