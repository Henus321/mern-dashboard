const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A customer must have a name"],
    trim: true,
    maxlength: [
      40,
      "An customer name must have less or equal then 40 characters!",
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
    min: 1,
    max: 9999999999999,
  },
  email: {
    type: String,
    required: [true, "A customer must have an email"],
    unique: true,
    trim: true,
    maxlength: [40, "An email must have less or equal then 40 characters!"],
    minlength: [6, "An email must have more or equal then 6 characters!"],
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
    maxlength: [50, "A city name must have less or equal then 50 characters!"],
    minlength: [4, "A city name must have more or equal then 4 characters!"],
  },
  key: String | Number,
});

customerSchema.pre("save", function (next) {
  this.key = uuid();
  next();
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
