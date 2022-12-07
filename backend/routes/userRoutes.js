const express = require("express");
const {
  getMe,
  updateMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require("../controllers/userController");
const {
  protect,
  registration,
  login,
  logout,
  isRedirect,
} = require("../controllers/authController");

const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
router.get("/logout", logout);
router.get("/is-redirect", isRedirect);

// Protect all routes after this middleware
router.use(protect);

router
  .route("/me")
  .get(getMe)
  .patch(uploadUserPhoto, resizeUserPhoto, updateMe);

module.exports = router;
