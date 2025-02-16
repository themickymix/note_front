"use client"; // Mark this as a Client Component

import React, { useEffect, useState } from "react";
import Login from "./login";
import Logout from "./logout";
import axios from "axios";
import Notes from "./notes";

export default function Home() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const iwam = () => {
      const ids = localStorage.getItem("user");
      axios
        .get(`https://note-be-ql9a.onrender.com/api/user/${ids}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
        })
        .then((res) => {
          setName(res.data.name);
          console.log(res.data);
        });
    };
    iwam();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://note-be-ql9a.onrender.com/api/notes",
        {
          title: title,
          content: note,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        } // Fixed syntax error
      );
      console.log(response.data);
      // Clear input fields after successful submission
      setTitle("");
      setNote("");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div>
      <Login />
      <Logout />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {name}
      <Notes />
    </div>
  );
}
