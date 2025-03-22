import React, { useState, useEffect } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "./api";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteContent, setEditingNoteContent] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load notes when the component mounts
  useEffect(() => {
    loadNotes();
  }, []);

  // Toggle dark mode and apply the class to the body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // Fetch notes from the backend
  const loadNotes = async () => {
    const data = await getNotes();
    const formattedNotes = data.map(note => ({ ...note, tags: note.tags || [] }));
    setNotes(formattedNotes);

    // Extract all unique tags
    const allTags = [...new Set(formattedNotes.flatMap(note => note.tags))];
    setTags(allTags);
  };

  // Add a new note
  const handleAddNote = async () => {
    if (newNote.trim() === "") return;

    try {
      const newNoteData = {
        title: "New note",
        content: newNote,
        archived: false,
        tags: [],
      };

      await createNote(newNoteData);
      setNewNote("");
      await loadNotes();
    } catch (error) {
      console.error("❌ Error adding note:", error);
    }
  };

  // Edit a note
  const handleEditNote = async (id, newContent) => {
    try {
      await updateNote(id, { content: newContent });
      setEditingNoteId(null);
      await loadNotes();
    } catch (error) {
      console.error("❌ Error editing note:", error);
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    await loadNotes();
  };

  // Archive/unarchive a note
  const handleArchiveNote = async (id, archived) => {
    await updateNote(id, { archived: !archived });
    await loadNotes();
  };

  // Add a tag to a note
  const handleAddTag = async (id, tag) => {
    if (!tag.trim()) return;
    const note = notes.find(n => n.id === id);
    if (!note.tags.includes(tag)) {
      const updatedTags = [...note.tags, tag];
      await updateNote(id, { tags: updatedTags });
      await loadNotes();
    }
  };

  // Remove a tag from a note
  const handleRemoveTag = async (id, tag) => {
    const note = notes.find(n => n.id === id);
    const updatedTags = note.tags.filter(t => t !== tag);
    await updateNote(id, { tags: updatedTags });
    await loadNotes();
  };

  // Filter notes by archive status
  const filteredNotes = showArchived
    ? notes.filter(note => note.archived)
    : notes.filter(note => !note.archived);

  // Filter notes by selected tag
  const notesToDisplay = selectedTag
    ? filteredNotes.filter(note => note.tags.includes(selectedTag))
    : filteredNotes;

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="container">
      <h1>Notes</h1>

      {/* Dark mode toggle button */}
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Add a new note */}
      <input
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Write a note"
      />
      <button onClick={handleAddNote}>Add Note</button>

      {/* Toggle archived notes view */}
      <button onClick={() => setShowArchived(!showArchived)}>
        {showArchived ? "View Active Notes" : "View Archived Notes"}
      </button>

      {/* Filter by tag */}
      <div className="select-container">
        <h3>Filter by tag:</h3>
        <select onChange={(e) => setSelectedTag(e.target.value)} value={selectedTag}>
          <option value="">All</option>
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* List of notes */}
      <h2>{showArchived ? "Archived Notes" : "Active Notes"}</h2>
      <ul>
        {notesToDisplay.map((note) => (
          <li key={note.id}>
            {editingNoteId === note.id ? (
              // Edit mode
              <>
                <input
                  value={editingNoteContent}
                  onChange={(e) => setEditingNoteContent(e.target.value)}
                />
                <button onClick={() => handleEditNote(note.id, editingNoteContent)}>
                  Save
                </button>
                <button onClick={() => setEditingNoteId(null)}>Cancel</button>
              </>
            ) : (
              // View mode
              <>
                {note.content}
                <button onClick={() => handleArchiveNote(note.id, note.archived)}>
                  {note.archived ? "Unarchive" : "Archive"}
                </button>
                <button onClick={() => handleDeleteNote(note.id)}>🗑</button>
                <button
                  onClick={() => {
                    setEditingNoteId(note.id);
                    setEditingNoteContent(note.content);
                  }}
                >
                  Edit
                </button>

                {/* Tags */}
                <div>
                  <strong>Tags:</strong> {note.tags.join(", ")}
                  <input
                    type="text"
                    placeholder="New tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddTag(note.id, e.target.value.trim());
                        e.target.value = "";
                      }
                    }}
                  />
                  {note.tags.map(tag => (
                    <button key={tag} onClick={() => handleRemoveTag(note.id, tag)}>❌ {tag}</button>
                  ))}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;