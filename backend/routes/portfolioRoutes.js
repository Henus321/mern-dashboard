const express = require("express");
const { protect } = require("../controllers/authController");
const {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
} = require("../controllers/portfolioController");

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router
  .route("/")
  .get(getPortfolio)
  .post(createPortfolio)
  .patch(updatePortfolio);

module.exports = router;
