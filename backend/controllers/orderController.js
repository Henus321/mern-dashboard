const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

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

exports.getOrder = asyncHandler(async (req, res, next) => {
  const doc = await Order.findById(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  if (!doc.user.equals(req.user._id)) {
    return next(
      new AppError(
        "Operation rejected! This order does not relevant to your profile."
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.updateOrder = asyncHandler(async (req, res, next) => {
  const doc = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  if (!doc.user.equals(req.user._id)) {
    return next(
      new AppError(
        "Operation rejected! This order does not relevant to your profile."
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const doc = await Order.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  if (!doc.user.equals(req.user._id)) {
    return next(
      new AppError(
        "Operation rejected! This order does not relevant to your profile."
      )
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
