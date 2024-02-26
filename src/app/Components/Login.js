"use client";
import React, { useState } from "react";
import { verifyUser } from "@/APIcalls/getuser";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import RegisterPage from "../registerpage/page";
import cryptr from "cryptr";

const Login = () => {
  const router = useRouter();
  const [usernameInput, setUsernameInput] = React.useState("");
  const [loginError, setLoginError] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function handleInput(event) {
    setUsernameInput(event.target.value);
  }


  async function handleLogin(event) {
    try {
      event.preventDefault();
      const isSuccesfull = await verifyUser(
        usernameInput,
        passwordInput,
        setLoginError
      );
      if (isSuccesfull) {
        router.push(`/profile/${usernameInput}`);
      }
      document.getElementById("loginbtn").disabled = true;
    } catch (error) {
      document.getElementById("loginbtn").disabled = true;
      setLoginError(error);

    }
  }

  if (isLoading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <div>
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
                required={true}
                aria-label="Username"
                aria-describedby="basic-addon1"
                onFocus={() => {
                  setLoginError(null);
                  document.getElementById("loginbtn").disabled = false;
                }}
                onChange={handleInput}
              />
            </div>
            <div>{loginError ? <p>{loginError.username}</p> : null}</div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Password
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                aria-label="Username"
                required={true}
                aria-describedby="basic-addon1"
                onChange={(event) => {
                  setPasswordInput(event.target.value);
                }}
                onFocus={() => {
                  setLoginError(null);
                  document.getElementById("loginbtn").disabled = false;
                }}
              />
            </div>
            <div>{loginError ? <p>{loginError.password}</p> : null}</div>
            <button id="loginbtn" className="btn btn-primary">
              Login
            </button>
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
