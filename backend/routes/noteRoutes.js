const express = require("express");
const { protect } = require("../controllers/authController");
const {
  getAllNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").get(getNote).patch(updateNote).delete(deleteNote);

module.exports = router;
