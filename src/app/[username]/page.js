"use client";
import React, { useEffect, useState } from "react";
import getUser from "../../APIcalls/getuser";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import Header from "../Components/Header";
import "../../../src/output.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function App({ params }) {
  const [clientSecret, setClientSecret] = useState("");
  const [userDetails, setUserDetails] = useState("");

  const username = params.username;
  console.log(userDetails);

  useEffect(() => {
    getUser(username, setUserDetails);
    fetch("/api", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <>

      <Header />
      <div className="checkout-profile">
        <img
          className="checkout-profile-pic"
          src={userDetails.img}
          alt="profile-picture"
        ></img>
        <h1>{userDetails.username}'s Profile</h1>
        <p>{userDetails.bio}</p>
      </div>
      <div id="checkout">

        {clientSecret && (
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </div>
    </>
  );
}
