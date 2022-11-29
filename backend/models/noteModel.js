const mongoose = require("mongoose");
const slugify = require("slugify");

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An note must have a name"],
    unique: true,
    trim: true,
    maxlength: [40, "An note name must have less or equal then 40 characters!"],
    minlength: [6, "An note name must have less or equal then 40 characters!"],
  },
  slug: String,
});

noteSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
