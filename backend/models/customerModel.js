const mongoose = require("mongoose");
const slugify = require("slugify");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A customer must have a name"],
      unique: true,
      trim: true,
      maxlength: [
        40,
        "An customer name must have less or equal then 40 characters!",
      ],
      minlength: [
        6,
        "An customer name must have less or equal then 40 characters!",
      ],
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

customerSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
