"use client";
import Header from "./Components/Header";
import Login from "./Components/Login";
import React, { useState } from "react";
import "../output.css";

export default function Home() {
  return (
    <>
      <Header />
      <Login />
    </>
  );
}
