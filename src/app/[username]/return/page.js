"use client";
import React, { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import {} from "next/navigation";
import "../../../../src/output.css";
import check from "../return/check.png";
import postPayment from "@/APIcalls/postPayment";

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
        console.log(data);
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        if(data.status === 'complete') {
          postPayment(sessionId)
        }
      });
  }, []);

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <section id="success">
        <img className="green-tick-pic" src={check} alt="green-tick" />
        <h1>Thank you!</h1>
        <p>
          We appreciate your kind gesture. A confirmation of your payment will
          be sent to {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
}

export default Return;
