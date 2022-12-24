const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
      trim: true,
      maxlength: [40, "A name must have less or equal then 40 characters!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      trim: true,
      maxlength: [40, "An email must have less or equal then 40 characters!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      trim: true,
      minlength: 6,
      maxlength: [40, "A password must have less or equal then 40 characters!"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      trim: true,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    photo: String,
    username: {
      type: String,
      trim: true,
      maxlength: [
        40,
        "An username must have less or equal then 40 characters!",
      ],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [40, "A company must have less or equal then 40 characters!"],
    },
    phone: {
      type: String,
      trim: true,
      minlength: [11, "A phone number must be exactly 11 characters!"],
      maxlength: [11, "A phone number must be exactly 11 characters!"],
      validate: {
        validator: function (el) {
          const reg = /^[0-9]+$/;
          return reg.test(el);
        },
        message: "Only numbers are allowed!",
      },
    },
    website: {
      type: String,
      trim: true,
      maxlength: [40, "A website must have less or equal then 40 characters!"],
    },
    address: {
      type: String,
      trim: true,
      maxlength: [
        100,
        "An address must have less or equal then 100 characters!",
      ],
    },
    about: {
      type: String,
      trim: true,
      maxlength: [200, "An about must have less or equal then 200 characters!"],
    },
    portfolio: {
      profession: {
        type: String,
        trim: true,
        maxlength: [
          40,
          "A profession must have less or equal then 40 characters!",
        ],
      },
      description: {
        type: String,
        trim: true,
        maxlength: [
          200,
          "A description must have less or equal then 200 characters!",
        ],
      },
      examples: {
        type: [
          {
            type: String,
            trim: true,
            maxlength: [
              100,
              "An example must have less or equal then 100 characters!",
            ],
          },
        ],
        validate: [ExamplesLimit, "Examples exceeds the limit of 10"],
      },
    },
  },
  {
    timestamps: true,
  }
);

function ExamplesLimit(val) {
  return val.length <= 10;
}

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
