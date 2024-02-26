"use client";
import React, { useState } from "react";
import { verifyUser } from "@/APIcalls/getuser";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import RegisterPage from "../registerpage/page";
import cryptr from "cryptr";
import background from '../../../src/background.png'

const Login = () => {
  const router = useRouter();
  const [usernameInput, setUsernameInput] = React.useState("");
  const [loginError, setLoginError] = useState({});
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function handleInput(event) {
    setUsernameInput(event.target.value);
  }

  function handleLogin(event) {
    setIsLoading(true)
    event.preventDefault();
    if (verifyUser(usernameInput, passwordInput)) {
      router.push(`/profile/${usernameInput}`);
    }
  }

  if (isLoading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <div>
      <h1 className="login-title">Welcome to Tipper</h1>
      <form className="login-card" onSubmit={handleLogin}>
        <div className="card " style={{ width: 90 + "%" }}>
          <div className="card-body">
            <div className="input-group mb-3">
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
    </div>
  );
};

export default Login;
