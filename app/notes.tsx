import React, { useState, useEffect } from "react";
import axios from "axios";

type Note = {
  _id: number;
  title: string;
  content: string;
};

function Notes() {
  const [notes, setNotes] = useState<Note[]>([]); // ✅ Use an empty array instead of null
  const [loading, setLoading] = useState(true); // ✅ Track loading state

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          "https://note-be-ql9a.onrender.com/api/notes",
          {
            withCredentials: true, // ✅ Include credentials if needed
            headers: { "Content-Type": "application/json" },
          }
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false); // ✅ Stop loading when request completes
      }
    };

    fetchNotes();
  }, []); // ✅ Run only once when the component mounts

  return (
    <div>
      {loading ? (
        <p>Loading...</p> // ✅ Show loading state
      ) : notes.length === 0 ? (
        <p>No notes available.</p> // ✅ Handle empty notes array
      ) : (
        notes.map((note) => (
          <div key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Notes;
