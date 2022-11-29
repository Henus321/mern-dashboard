const mongoose = require("mongoose");
const slugify = require("slugify");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "An order must have a name"],
      unique: true,
      trim: true,
      maxlength: [
        40,
        "An order name must have less or equal then 40 characters!",
      ],
      minlength: [
        6,
        "An order name must have less or equal then 40 characters!",
      ],
    },
    slug: String,
  },
  {
    timestamps: true,
  }
);

// Virtual populate for customers late!!!11

orderSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
