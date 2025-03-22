const { Note } = require("../models");

// Retrieve all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    console.error("❌ Error retrieving notes:", error);
    res.status(500).json({ error: "Error retrieving notes" });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title = "Untitled", content, archived = false, tags = [] } = req.body;
    const newNote = await Note.create({
      title,
      content,
      archived,
      tags: Array.isArray(tags) ? tags.join(",") : tags, // Store as a comma-separated string
    });

    console.log("✅ Note saved:", newNote);
    res.status(201).json(newNote);
  } catch (error) {
    console.error("❌ Error creating the note:", error);
    res.status(500).json({ error: "Error creating the note" });
  }
};

// Update an existing note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, archived, tags } = req.body;
    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (archived !== undefined) note.archived = archived;
    if (tags !== undefined) note.tags = Array.isArray(tags) ? tags.join(",") : tags;

    await note.save();
    console.log("✅ Note updated:", note);
    res.json(note);
  } catch (error) {
    console.error("❌ Error updating the note:", error);
    res.status(500).json({ error: "Error updating the note" });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("❌ Error deleting the note:", error);
    res.status(500).json({ error: "Error deleting the note" });
  }
};
