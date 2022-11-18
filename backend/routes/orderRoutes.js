const express = require("express");
const { protect } = require("../controllers/authController");
const { getAllOrders, createOrder } = require("../controllers/orderController");

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.route("/").get(getAllOrders).post(createOrder);

module.exports = router;
