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
  // add fields later
  const { name } = req.body;

  if (!name) {
    return next(new AppError("Please add a name", 400));
  }

  const customer = await Customer.create({
    name,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: customer,
    },
  });
});
