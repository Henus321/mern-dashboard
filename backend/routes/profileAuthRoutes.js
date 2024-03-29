const express = require("express");
const {
  getMe,
  updateMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require("../controllers/profileController");
const {
  protect,
  registration,
  login,
  logout,
  passwordChange,
} = require("../controllers/authController");

const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
router.get("/logout", logout);

// Protect all routes after this middleware
router.use(protect);

router
  .route("/me")
  .get(getMe)
  .patch(uploadUserPhoto, resizeUserPhoto, updateMe);

router.route("/password-change").patch(passwordChange);

module.exports = router;
