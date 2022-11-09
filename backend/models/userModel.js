const mongoose = require("mongoose");
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
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      // select: false,
    },
    // passwordConfirm: {
    //   type: String,
    //   required: [true, "Please confirm your password"],
    //   validate: {
    //     validator: function (el) {
    //       return el === this.password;
    //     },
    //     message: "Passwords are not the same!",
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
