const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

// Get all notes
router.get("/", noteController.getAllNotes);

// Create a new note
router.post("/", noteController.createNote);

// Update a note
router.put("/:id", noteController.updateNote);

// Delete a note
router.delete("/:id", noteController.deleteNote);

module.exports = router;