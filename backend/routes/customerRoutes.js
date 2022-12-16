const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.route("/").get(getAllCustomers).post(createCustomer);
router.route("/:id").get(getCustomer).patch(updateCustomer);

// Only allowed to users with role type "admin"
router.use(restrictTo("admin"));

router.route("/:id").delete(deleteCustomer);

module.exports = router;
