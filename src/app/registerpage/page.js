"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import postUser from "@/APIcalls/postuser";
import cryptr from "cryptr";
import Header from "../Components/Header";
import "../../../src/output.css";

export const Crypt = new cryptr(process.env.NEXT_PUBLIC_SECRET);

const RegisterPage = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [information, setInformation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [postedStatus, setPostedStatus] = useState(false);
  const [isError, setIsError] = useState(false);
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const regexPassword =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{6,}$/g;

  function handleImage(event) {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImage(data.result);
    });
    if (event.target.files[0]) {
      data.readAsDataURL(event.target.files[0]);
    }
  }

  function handleChange(event) {
    const confirmPassword = document.getElementById("confirmPassword").value;
    const password = document.getElementById("password").value;
    setInformation((currentInformation) => {
      const newInformation = { ...currentInformation };
      newInformation[event.target.id] = event.target.value;

      return newInformation;
      // }
    });
    if (
      event.target.id === "password" &&
      password &&
      !regexPassword.test(password) === true
    ) {
      setPasswordError(true);
      event.preventDefault();
    } else if (
      regexPassword.test(password) === false &&
      event.target.id === "password"
    ) {
      setPassword(event.target.value);
      setPasswordError(false);
    } else if (
      event.target.id === "username" &&
      event.target.value &&
      event.target.value.length < 4
    ) {
      setUsernameError(true);
      event.preventDefault();
    } else if (
      event.target.id === "username" &&
      event.target.value &&
      event.target.value.length > 3
    ) {
      setUsernameError(false);
      event.preventDefault();
    } else if (
      confirmPassword !== password &&
      password &&
      confirmPassword &&
      event.target.id === "confirmPassword"
    ) {
      setPasswordMatchError(true);
      event.preventDefault();
    } else if (
      confirmPassword === password &&
      password &&
      confirmPassword &&
      event.target.id === "confirmPassword"
    ) {
      setPasswordMatchError(false);
      event.preventDefault();
    }
  }

  useEffect(() => {
    setInformation((currentInformation) => {
      const newInformation = { ...currentInformation };
      newInformation.img_url = image;
      return newInformation;
    });
  }, [image]);

  async function handleSubmit(event) {
    const confirmPassword = document.getElementById("confirmPassword").value;
    const password = document.getElementById("password").value;

    const encryptedString = Crypt.encrypt(password);

    event.preventDefault();
    setIsError(false);
    setIsLoading(true);
    setPostedStatus(true);
    document.getElementById("submitButton").disabled = true;
    document.getElementById("cancelUpload").disabled = true;
    await postUser(
      information,
      setIsLoading,
      setPostedStatus,
      setIsError,
      encryptedString
    );
  }

  useEffect(() => {
    if (postedStatus) {
      router.push("/");
    }
  }, [postedStatus, router]);

  return (
    <>
      <div className="registration-page">
        <a href="/" className="btn btn-primary return-login">
          Login
        </a>
        <h1 className="register-title" style={{ textAlign: "center" }}>
          Registration Page
        </h1>

        <form className="register-card" onSubmit={handleSubmit}>
          <div className="card " style={{ width: 90 + "%" }}>
            <div className="card-body">
              <div className="input-div">
                <label htmlFor="firstName" className="form-label"></label>
                <input
                  type="text"
                  className="form-control input-field"
                  placeholder="First Name"
                  id="firstName"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-div">
                <label htmlFor="lastName" className="form-label"></label>
                <input
                  type="text"
                  className="form-control input-field"
                  placeholder="Last Name"
                  id="lastName"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-div">
                <label htmlFor="username" className="form-label"></label>
                <input
                  type="text"
                  className="form-control input-field"
                  placeholder="Username"
                  id="username"
                  onChange={handleChange}
                  required
                />
              </div>
              {usernameError ? (
                <div>
                  <p style={{ color: "red" }}>
                    username has to be at least four characters
                  </p>
                </div>
              ) : null}
              <div className="input-div">
                <label htmlFor="password" className="form-label"></label>
                <input
                  type="password"
                  className="form-control input-field"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  required
                />
              </div>
              {passwordError ? (
                <div>
                  <p style={{ color: "red" }}>
                    password has to be at least six characters containing a
                    mixture of letters, numbers and special characters
                  </p>
                </div>
              ) : null}
              <div className="input-div">
                <label htmlFor="password" className="form-label"></label>
                <input
                  type="password"
                  className="form-control input-field"
                  placeholder="Confirm password"
                  id="confirmPassword"
                  onChange={handleChange}
                  required
                />
              </div>
              {passwordMatchError ? (
                <p style={{ color: "red" }}>the passwords do not match</p>
              ) : null}
              <div className="input-div">
                <label htmlFor="workPlace" className="form-label"></label>
                <input
                  type="text"
                  className="form-control input-field"
                  placeholder="Workplace"
                  id="workPlace"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 input-div">
                <label htmlFor="email" className="form-label"></label>
                <input
                  type="email"
                  className="form-control input-field"
                  placeholder="Email"
                  id="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <textarea
                  id="bio"
                  className="form-control bio-input"
                  placeholder="Tell us a bit about yourself.."
                  aria-label="Bio input"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="input-group upload-image-form">
                <input
                  type="file"
                  className="form-control select-img"
                  id="img"
                  aria-label="Upload"
                  accept=".jpg, .png"
                  onChange={handleImage}
                  required
                />
              </div>
              {image ? (
                <div>
                  <img src={image} className="uploaded-img" />
                  <button
                    id="cancelUpload"
                    type="button"
                    className="btn btn-danger btn-sm cancel-uploaded-img"
                    onClick={() => {
                      setImage(null);
                    }}
                  >
                    Cancel upload
                  </button>
                </div>
              ) : null}
              <button
                id="submitButton"
                type="submit"
                className="btn submit-btn"
              >
                Sign Up
              </button>
              {isLoading && (
                <p>Please wait while we create your profile page</p>
              )}
              {isError && (
                <p>Sorry, something went wrong. Please try again later.</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
