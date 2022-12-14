const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const validator = require("validator");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A customer must have a name"],
    trim: true,
    maxlength: [
      20,
      "An customer name must have less or equal then 20 characters!",
    ],
    minlength: [
      4,
      "An customer name must have more or equal then 4 characters!",
    ],
  },
  phone: {
    type: String,
    required: [true, "A customer must have a phone"],
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
  email: {
    type: String,
    required: [true, "A customer must have an email"],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [20, "An email must have less or equal then 20 characters!"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  social: {
    type: String,
    default: null,
    trim: true,
    maxlength: [
      100,
      "A social network link must have less or equal then 100 characters!",
    ],
  },
  city: {
    type: String,
    required: [true, "A customer must have a city"],
    trim: true,
    maxlength: [20, "A city name must have less or equal then 20 characters!"],
  },
  key: String | Number,
});

customerSchema.pre("save", function (next) {
  this.key = uuid();
  next();
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
