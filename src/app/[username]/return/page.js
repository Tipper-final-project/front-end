"use client";
import React, { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import {} from "next/navigation";
import "../../../../src/output.css";
import check from '../return/check.png'
import postPayment from "@/APIcalls/postPayment";
import { postMessage } from "@/APIcalls/messages";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    fetch(`/api?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        postMessage("eileen");
        postPayment(sessionId, setStatus);
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === "open") {
    return redirect("/");
  }
  if (status === "complete") {
    return (
      <section id="success" className="success-container">
        <img className="success-img" src={check.src} alt="successful payment check"/>
        <div className="success-msg">
        <h1>Thank you!</h1>
        <p>
          I appreciate your kind gesture. A confirmation of your payment will
          be sent to {customerEmail}.<br></br>If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">example@tipper.co.uk</a>.
        </p>
        </div>
      </section>
    );
  }

  return null;
};

export default Return;
