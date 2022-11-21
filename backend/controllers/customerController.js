const Customer = require("../models/customerModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

exports.getAllCustomers = asyncHandler(async (req, res, next) => {
  const customers = await Customer.find();

  res.status(200).json({
    status: "success",
    results: customers.length,
    data: {
      data: customers,
    },
  });
});

exports.createCustomer = asyncHandler(async (req, res, next) => {
  const { name, phone, email, social, city } = req.body;

  if (!name || !phone || !email || !city) {
    return next(new AppError("Please add a name, phone, email and city", 400));
  }

  const customer = await Customer.create({
    name,
    phone,
    email,
    social,
    city,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: customer,
    },
  });
});

exports.updateCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!customer) {
    return next(new AppError("No customer found with that ID", 404));
  }

  res.status(201).json({
    status: "success",
    data: {
      data: customer,
    },
  });
});

exports.deleteCustomer = asyncHandler(async (req, res, next) => {
  const doc = await Customer.findByIdAndDelete(req.body.id);

  if (!doc) {
    return next(new AppError("No customer found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
