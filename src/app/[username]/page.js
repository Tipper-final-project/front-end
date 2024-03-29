"use client";
import React, { useEffect, useState } from "react";
import getUser from "../../APIcalls/getuser";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import "../../../src/output.css";
import Loading from "../Components/Loading";
import Error from "../Components/Error";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function App({ params }) {
  const [clientSecret, setClientSecret] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const username = params.username;

  useEffect(() => {
    getUser(username, setUserDetails, setIsLoading);;
    setError(error);
    fetch("/api", {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  
  if (error) return <Error error={error} />;
  
  return isLoading ? <Loading /> : <>
    <div className="checkout-profile">
      <img
        className="checkout-profile-pic"
        src={userDetails.img_url}
        alt="profile-picture"
      ></img>
      <h1>{userDetails.username}</h1>
      <p>{userDetails.bio}</p>
    </div>  
     <div className="whitebox">Hello</div>
    <div id="checkout" className="stripe-page">
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
}
