"use client";
import React, { useState } from "react";
import { verifyUser } from "@/APIcalls/getuser";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

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
      document.getElementById("loginbtn").disabled = true;
      event.preventDefault();
      await verifyUser(
        usernameInput,
        passwordInput,
        setLoginError
      ).then((response) => {
        if(response) {
          router.push(`/profile/${usernameInput}`);
          document.getElementById("loginbtn").disabled = false;
        }
      });
    } catch (error) {
      document.getElementById("loginbtn").disabled = false;
      setLoginError(error);
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
            <div>{loginError ? <p style={{ color: "red" }}>{loginError.username}</p> : null}</div>
            <div className="input-group mb-3">
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
            <div>{loginError ? <p style={{ color: "red" }}>{loginError.password}</p> : null}</div>
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
