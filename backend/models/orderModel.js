const mongoose = require("mongoose");
const slugify = require("slugify");

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
    assembly: {
      type: String,
      required: [true, "An order must have an assembly"],
    },
    payment: {
      type: [String],
      required: [true, "An order must have a payment type"],
    },
    registration: {
      type: Date,
      required: [true, "An order must have a registration date"],
    },
    delivery: {
      type: Date,
      required: [true, "An order must have a delivery date"],
    },
    manager: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "An order must contain a manager"],
    },
    slug: String,
    number: Number,
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

orderSchema.pre("save", async function (next) {
  this.number = (await this.find().length) + 1;
  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "customer",
    select: "name",
  })
    .populate({
      path: "product",
      select: "brand model name photoUrl cost description",
    })
    .populate({
      path: "manager",
      select: "name",
    });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
