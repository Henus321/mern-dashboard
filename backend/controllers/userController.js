const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError("Wooops! Cant find current user.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.updateMe = asyncHandler(async (req, res) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for password updates.", 400));
  }

  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
    "avatarUrl",
    "username",
    "company",
    "phone",
    "website",
    "address",
    "about"
  );

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return next(new AppError("Wooops! Cant update current user.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: updatedUser,
    },
  });
});
