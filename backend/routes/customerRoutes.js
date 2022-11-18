const express = require("express");
const { protect } = require("../controllers/authController");
const {
  getAllCustomers,
  createCustomer,
} = require("../controllers/customerController");

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.route("/").get(getAllCustomers).post(createCustomer);

module.exports = router;
