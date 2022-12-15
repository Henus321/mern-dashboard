const Note = require("../models/noteModel");
const factory = require("../utils/handlerFactory");

exports.getAllNotes = factory.getAll(Note);
exports.getNote = factory.getOne(Note);
exports.createNote = factory.createOne(Note);
exports.updateNote = factory.updateOne(Note);
exports.deleteNote = factory.deleteOne(Note);
