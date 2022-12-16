const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = asyncHandler(async (req, res, next) => {
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

exports.updateMe = asyncHandler(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm || req.body.email) {
    return next(
      new AppError("This route is not for password or email updates.", 400)
    );
  }
  const filteredBody = filterObj(
    req.body,
    "name",
    "photo",
    "username",
    "company",
    "phone",
    "website",
    "address",
    "about",
    "portfolio"
  );

  if (req.file) filteredBody.photo = req.file.filename;

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
