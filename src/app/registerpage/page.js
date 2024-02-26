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
    setInformation((currentInformation) => {
      const newInformation = { ...currentInformation };
      newInformation[event.target.id] = event.target.value;
      return newInformation;
      // }
    });
    if (event.target.id === "password") {
      setPassword(event.target.value);
    }
  }

  useEffect(() => {
    setInformation((currentInformation) => {
      const newInformation = { ...currentInformation };
      newInformation.img = image;
      return newInformation;
    });
  }, [image]);

  async function handleSubmit(event) {
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
      <a href="/" className="btn btn-primary return-login">
        Login
      </a>
      <h1 className="register-title" style={{ textAlign: "center" }}>
        Registration Page
      </h1>
      <form
        className="register-card"
        onSubmit={handleSubmit}
      >
      <div className="card " style={{ width: 90 + "%" }}>
      <div className="register-card-body">
        <div className="input-group mb-3">
          <label htmlFor="firstName" className="form-label">
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            id="firstName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="lastName" className="form-label">
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            id="lastName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="username" className="form-label">
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="password" className="form-label">
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="workPlace" className="form-label">
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Workplace"
            id="workPlace"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="email" className="form-label">
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <textarea
            id="bio"
            className="form-control"
            placeholder="Tell us a bit about yourself.."
            aria-label="Bio input"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="input-group">
          <input
            type="file"
            className="form-control"
            id="img"
            aria-label="Upload"
            accept=".jpg, .png"
            onChange={handleImage}
            required
          />
        </div>
        {image ? (
          <div>
            <img
              src={image}
              style={{
                width: "300px",
                height: "300px",
              }}
            />
            <button
              id="cancelUpload"
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setImage(null);
              }}
            >
              Cancel upload
            </button>
          </div>
        ) : null}
        <div className="col-12">
          {postedStatus ? (
            <button
              onClick={() => router.push("/")}
              className="btn btn-success"
              style={{ width: "170px", marginLeft: "10px" }}
            >
              Go to profile page
            </button>
          ) : null}
        </div>
        <button id="submitButton" type="submit" className="btn btn-primary">
          Sign Up
        </button>
        {isLoading && <p>Please wait while we create your profile page</p>}
        {isError && <p>Sorry, something went wrong. Please try again later.</p>}
      </div>
      </div>
      </form>
      </>
  );
};

export default RegisterPage;
