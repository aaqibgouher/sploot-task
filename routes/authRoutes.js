const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// signup and login routes
router.post("/signup", authController.register);
router.post("/login", authController.login);

// exported router
module.exports = router;
