const express = require("express");
const { getMe } = require("../controllers/userController");
const {
  protect,
  registration,
  login,
  logout,
} = require("../controllers/authController");

const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
router.get("/logout", logout);

// Protect all routes after this middleware
router.get("/me", protect, getMe);

module.exports = router;
