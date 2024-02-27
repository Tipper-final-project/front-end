"use client";
import Header from "./Components/Header";
import Login from "./Components/Login";
import React, { useState } from "react";
import "../output.css";
import Image from "next/legacy/image";
import background from "../../src/background.png";

export default function Home() {
  return (
    <>
      <Header props={"null"}/>
      <Login />
    </>
  );
}
