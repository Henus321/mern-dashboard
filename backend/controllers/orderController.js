const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const factory = require("../utils/handlerFactory");

exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const query = {
    user: req.user._id,
  };
  const doc = await Order.find(query);

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.createOrder = asyncHandler(async (req, res, next) => {
  const query = {
    ...req.body,
    user: req.user._id,
  };
  const doc = await Order.create(query);

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
exports.getOrder = factory.getOne(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
