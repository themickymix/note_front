import React, { useState, useEffect } from "react";
import axios from "axios";

type Note = {
  _id: number;
  title: string;
  content: string;
};

function Notes() {
  const [notes, setNotes] = useState<Note[] | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          "https://note-be-ql9a.onrender.com/api/notes",
          {
            withCredentials: true, // Include credentials if needed
            headers: {
              "Content-Type": "application/json",
              credentials: "include",
            },
          }
        );
        setNotes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, [notes]);

  return (
    <div>
      {notes === null ? (
        <p>Loading...</p>
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
