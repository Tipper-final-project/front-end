"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import getUser from "@/APIcalls/getuser";
import userdetailsContext from "@/context/usercontext";

const Login = () => {
  const [usernameInput, setUsernameInput] = React.useState("");
  const { setUserdetails } = useContext(userdetailsContext);

  function handleInput(event) {
    setUsernameInput(event.target.value);
  }

  function handleLogin(event) {
    event.preventDefault();
    getUser(usernameInput, setUserdetails);
    console.log("hi");
  }

  return (
    <form className="login-card" onSubmit={handleLogin}>
      <div className="card " style={{ width: 540 + "px" }}>
        <div className="card-header">Login/Register</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Username
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleInput}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Password
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <button href="/profilepage" className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
