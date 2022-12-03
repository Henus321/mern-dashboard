const express = require("express");
const { getMe, updateMe } = require("../controllers/userController");
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
router.use(protect);

router.route("/me").get(getMe).patch(updateMe);

module.exports = router;
