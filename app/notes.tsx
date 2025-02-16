import React, { useState, useEffect } from "react";
import axios from "axios";

type Note = {
  _id: number;
  title: string;
  content: string;
};

function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const userId = localStorage.getItem("user") || ""; // Ensure `userId` is never `null`
console.log(localStorage.getItem("user"));
const fetchNotes = async () => {
  if (!userId) {
    console.error("User ID is missing!");
    setLoading(false);
    return;
  }

  try {
    const response = await axios.get(
      `https://note-be-ql9a.onrender.com/api/user/${userId}`,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    // ✅ Ensure response.data is always an array
    const fetchedNotes = Array.isArray(response.data) ? response.data : [];

    setNotes(fetchedNotes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    setNotes([]); // Prevent errors if request fails
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchNotes();
  }, []); // Fetch notes only on mount

  const addNote = async () => {
    if (!newNote.title || !newNote.content) return;

    try {
      const response = await axios.post(
        "https://note-be-ql9a.onrender.com/api/notes",
        { ...newNote, userId }, // Ensure the note is linked to the user
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const createdNote = response.data;

      // ✅ Optimistically update the state
      setNotes((prevNotes) => [createdNote, ...prevNotes]);

      // ✅ Clear input fields
      setNewNote({ title: "", content: "" });
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div>
      <h2>Notes</h2>

      {/* New Note Form */}
      <input
        type="text"
        placeholder="Title"
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newNote.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
      />
      <button onClick={addNote}>Add Note</button>

      {/* Notes Display */}
      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        notes.map((note, index) => (
          <div key={index}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Notes;
