const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      data: orders,
    },
  });
});
