const express = require("express");
const { protect } = require("../controllers/authController");
const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersController");

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.route("/").get(getAllOrders).post(createOrder);
router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
