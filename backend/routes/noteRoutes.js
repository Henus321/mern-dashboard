const express = require("express");
const { protect } = require("../controllers/authController");
const { getAllNotes, createNote } = require("../controllers/noteController");

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.route("/").get(getAllNotes).post(createNote);

module.exports = router;
