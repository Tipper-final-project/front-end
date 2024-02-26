"use client";
import Header from "./Components/Header";
import Login from "./Components/Login";
import React, { useState } from "react";
import "../output.css";
import Image from "next/image";
import background from '../../src/background.png'

export default function Home() {
  return (
    <div className="background" style={{ zIndex: 0, position: 'fixed', width: '100%', height: '100%'}}>
      <Image src={background} placeholder="blur" layout="fill" objectFit="cover" alt="background image"/>
      <Header />
      <Login />
    </div>
  );
}
