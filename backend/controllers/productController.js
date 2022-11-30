const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      data: products,
    },
  });
});

exports.getProductsByBrand = asyncHandler(async (req, res, next) => {
  const query = {
    brand: req.params.brand,
  };
  const products = await Product.find(query);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      data: products,
    },
  });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  const { brand, model, photoUrl, cost, description } = req.body;

  if (!brand || !model || !photoUrl || !cost || !description) {
    return next(new AppError("Please add a name", 400));
  }

  const product = await Product.create({
    brand,
    model,
    photoUrl,
    cost,
    description,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: product,
    },
  });
});
