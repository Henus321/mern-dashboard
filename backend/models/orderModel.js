const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
      required: [true, "An order must contain a customer"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "An order must contain a product"],
    },
    build: {
      type: String,
      required: [true, "An order must have a build"],
    },
    payment: {
      type: [String],
      required: [true, "An order must have a payment type"],
    },
    delivery: {
      type: Date,
      required: [true, "An order must have a delivery date"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "customer",
    select: "name",
  }).populate({
    path: "product",
    select: "brand model name photoUrl cost description",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
