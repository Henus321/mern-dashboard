const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "A product must have a brand"],
    trim: true,
    maxlength: [
      40,
      "A product brand must have less or equal then 40 characters!",
    ],
  },
  model: {
    type: String,
    required: [true, "A product must have a model"],
    unique: true,
    trim: true,
    maxlength: [
      40,
      "A product model must have less or equal then 40 characters!",
    ],
  },
  photoUrl: {
    type: String,
    required: [true, "A product must have a photo"],
    trim: true,
    maxlength: [
      200,
      "A product photoUrl must have less or equal then 200 characters!",
    ],
  },
  cost: {
    type: Number,
    required: [true, "A product must have a cost"],
    trim: true,
    maxlength: [
      20,
      "A product model must have less or equal then 20 characters!",
    ],
  },
  description: {
    type: String,
    required: [true, "A product must have a description"],
    trim: true,
    maxlength: [
      1000,
      "A product description must have less or equal then 1000 characters!",
    ],
  },
  name: String,
  slug: String,
});

productSchema.pre("save", function (next) {
  this.name = `${this.brand.charAt(0).toUpperCase() + this.brand.slice(1)} ${
    this.model
  }`;
  next();
});

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
