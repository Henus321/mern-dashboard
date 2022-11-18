const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

exports.getAllNotes = asyncHandler(async (req, res, next) => {
  const notes = await Note.find();

  res.status(200).json({
    status: "success",
    results: notes.length,
    data: {
      data: notes,
    },
  });
});

exports.createNote = asyncHandler(async (req, res, next) => {
  // add fields later
  const { name } = req.body;

  if (!name) {
    return next(new AppError("Please add a name", 400));
  }

  const note = await Note.create({
    name,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: note,
    },
  });
});
