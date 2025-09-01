const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const landingController = require("../controllers/landingController");

// Register
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

// Login
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

// Dashboard
router.get("/dashboard", authController.getDashboard);

// Logout
router.get("/logout", authController.logout);

//landing page
router.get('/', landingController.getLandingPage);

module.exports = router;
