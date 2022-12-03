const Portfolio = require("../models/portfolioModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

exports.getPortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.findOne({
    $contains: { user: req.user._id },
  });
  if (!portfolio) {
    return next(new AppError("Can't find portfolio!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: portfolio,
    },
  });
});

exports.createPortfolio = asyncHandler(async (req, res, next) => {
  const query = {
    ...req.body,
    user: req.user._id,
  };

  const portfolio = await Portfolio.create(query);
  if (!portfolio) {
    return next(new AppError("Can't create portfolio!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: portfolio,
    },
  });
});

exports.updatePortfolio = asyncHandler(async (req, res, next) => {
  const portfolio = await Portfolio.findOneAndUpdate(
    {
      $contains: { user: req.user._id },
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!portfolio) {
    return next(new AppError("Can't update portfolio!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: portfolio,
    },
  });
});
