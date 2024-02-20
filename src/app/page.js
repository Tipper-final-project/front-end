"use client";
import Header from "./Components/Header";
import Login from "./Components/Login";
import userdetailsContext from "@/context/usercontext";
import React, { useState } from "react";

export default function Home() {
  const [userdetails, setUserdetails] = React.useState("");

  return (
    <userdetailsContext.Provider value={{ userdetails, setUserdetails }}>
      <Header />
      <Login />
    </userdetailsContext.Provider>
  );
}
