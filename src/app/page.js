"use client";
import Header from "./Components/Header";
import Login from "./Components/Login";
import userdetailsContext from "@/context/usercontext";
import React, { useState } from "react";
import ProfilePage from "./profilepage/page";
import "../output.css";

export default function Home() {
  const [userDetails, setUserDetails] = React.useState("");
  const [isLoggedin, setIsLoggedin] = React.useState(false);

  return (
    <userdetailsContext.Provider
      value={{ userDetails, setUserDetails, isLoggedin, setIsLoggedin }}
    >
      <Header />
      {isLoggedin ? <ProfilePage /> : <Login />}
    </userdetailsContext.Provider>
  );
}
