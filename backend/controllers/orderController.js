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
  const { product, customer, assembly, payment, registration, delivery } =
    req.body;

  if (
    !product ||
    !customer ||
    !assembly ||
    !payment ||
    !registration ||
    !delivery
  ) {
    return next(
      new AppError(
        "Please add product, customer, assembly, payment, registration and delivery",
        400
      )
    );
  }

  const order = await Order.create({
    product,
    customer,
    assembly,
    payment,
    registration,
    delivery,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: order,
    },
  });
});

exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: order,
    },
  });
});

exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  res.status(201).json({
    status: "success",
    data: {
      data: order,
    },
  });
});

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
