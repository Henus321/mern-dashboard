const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

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
