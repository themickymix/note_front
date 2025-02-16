"use client"; // This makes the component interactive

import axios from "axios";
import React from "react";

function Login() {
  const login = () => {
    axios
      .post(
        "https://note-be-ql9a.onrender.com/api/user/login",
        {
          email: "michael3@gmail.com",
          password: "michael3",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
        }
      )
      .then((res) => {
        console.log(res.data.user);
        localStorage.setItem("user", res.data.user);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
