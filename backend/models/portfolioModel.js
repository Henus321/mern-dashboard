const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  profession: {
    type: String,
    maxlength: [40, "A profession must have less or equal then 40 characters!"],
  },
  description: {
    type: String,
    maxlength: [
      200,
      "A description must have less or equal then 200 characters!",
    ],
  },
  examples: {
    type: [String],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    unique: true,
    required: [true, "Review must belong to a user"],
  },
});

portfolioSchema.index({ user: 1 }, { unique: true });

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
