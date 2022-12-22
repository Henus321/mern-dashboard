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
    type: Number,
    required: [true, "A customer must have a phone"],
    trim: true,
    validate: {
      validator: (phone) => phone <= 99999999999 && phone > 9999999999,
      message: "A phone number must be exactly 11 characters!",
    },
  },
  email: {
    type: String,
    required: [true, "A customer must have an email"],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [40, "An email must have less or equal then 40 characters!"],
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
    maxlength: [40, "A city name must have less or equal then 40 characters!"],
  },
  key: String | Number,
});

customerSchema.pre("save", function (next) {
  this.key = uuid();
  next();
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
