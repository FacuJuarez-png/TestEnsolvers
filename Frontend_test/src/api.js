const API_URL = "http://localhost:3001/api/notes"; // Ensure this matches your backend

// Fetch all notes
export const getNotes = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// Create a new note
export const createNote = async (note) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return response.json();
};

// Update a note
export const updateNote = async (id, updatedFields) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  });
  return response.json();
};

// Delete a note
export const deleteNote = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};