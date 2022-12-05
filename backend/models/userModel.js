const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    photo: String,
    username: {
      type: String,
      maxlength: [
        40,
        "An username must have less or equal then 40 characters!",
      ],
    },
    company: {
      type: String,
      maxlength: [40, "A company must have less or equal then 40 characters!"],
    },
    phone: {
      type: Number,
      maxlength: [
        40,
        "An phone number must have less or equal then 40 characters!",
      ],
      minlength: [
        10,
        "An phone number must have greater or equal then 10 characters!",
      ],
    },
    website: {
      type: String,
      maxlength: [40, "A website must have less or equal then 40 characters!"],
    },
    address: {
      type: String,
      maxlength: [
        100,
        "An address must have less or equal then 100 characters!",
      ],
    },
    about: {
      type: String,
      maxlength: [200, "An about must have less or equal then 200 characters!"],
    },
    portfolio: {
      profession: {
        type: String,
        maxlength: [
          40,
          "A profession must have less or equal then 40 characters!",
        ],
      },
      description: {
        type: String,
        maxlength: [
          200,
          "A description must have less or equal then 200 characters!",
        ],
      },
      examples: {
        type: [String],
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ portfolio: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
