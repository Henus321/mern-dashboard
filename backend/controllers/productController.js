const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const factory = require("../utils/handlerFactory");

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find().sort({
    brand: -1,
  });

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      data: products,
    },
  });
});

exports.createProduct = factory.createOne(Product);

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
