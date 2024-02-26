"use client";
import React, { useState, useContext } from "react";
import getUser from "@/APIcalls/getuser";
import userdetailsContext from "@/context/usercontext";

import Loading from "./Loading";
import RegisterPage from "../registerpage/page";
import ProfilePage from "../profilepage/page";
import cryptr from "cryptr";


const Login = () => {
  const [usernameInput, setUsernameInput] = React.useState("");
  const { setUserDetails, setIsLoggedin } = useContext(userdetailsContext);
  const [loginError, setLoginError] = useState({});
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isLoggedin] = useState(true)
  
  function handleInput(event) {
    setUsernameInput(event.target.value);
  }

  function handleLogin(event) {
    setIsLoading(true)
    event.preventDefault();
    getUser(
      usernameInput,
      passwordInput,
      setUserDetails,
      setIsLoggedin,
      setLoginError
    );
    setIsLoading(false)

  }

  if (isLoading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <div>
      {/*
        Conditionally render either the RegisterPage or ProfilePage based on the user's authentication status.
      */}
      {!isLoggedin ? (
        <RegisterPage />
      ) : (
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
                {loginError.type === "username" ? (
                  <span>Username Does Not Exist</span>
                ) : null}
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Password
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(event) => {
                    setPasswordInput(event.target.value);
                  }}
                />
              </div>
              <button className="btn btn-primary">Login</button>
            </div>
            <span className="register-link">
              <a href="/registerpage">Don't have an account? Register Here</a>
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
