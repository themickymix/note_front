"use client"; // Ensures interactivity

import axios from "axios";
import React from "react";

function Logout() {
  const logout = async () => {
    try {
      await axios.post(
        "https://note-be-ql9a.onrender.com/api/user/logout",
        {}, // No body needed
        {
          withCredentials: true, // ✅ Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
        }
      );
      localStorage.clear();
      window.location.reload(); // ✅ Refresh to reflect logout state
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return <button onClick={logout}>Logout</button>;
}

export default Logout;
