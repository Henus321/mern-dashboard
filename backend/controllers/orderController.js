const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

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

exports.createOrder = asyncHandler(async (req, res, next) => {
  // add fields later
  const { name } = req.body;

  if (!name) {
    return next(new AppError("Please add a name", 400));
  }

  const order = await Order.create({
    name,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: order,
    },
  });
});
