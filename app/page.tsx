"use client"; // Mark this as a Client Component

import React, { useEffect, useState } from "react";
import Login from "./login";
import Logout from "./logout";
import Notes from "./notes";

export default function Home() {

  return (
    <div>
      <Login />
      <Logout />
      <Notes />
    </div>
  );
}
