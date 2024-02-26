"use client";
import Header from "./Components/Header";
import Login from "./Components/Login";
import React, { useState } from "react";
import "../output.css";
import background from '../../src/background.png'

export default function Home() {
  return (
    <>
    <div className="background" style={{ backgroundImage: `url(${background.src})` }}>
      <Header />
      <Login />
    </div>
    </>
  );
}
