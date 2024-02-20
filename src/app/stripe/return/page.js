"use client";
import React, { useEffect, useState } from 'react';
import { redirect,useSearchParams } from 'next/navigation';
import {  } from 'next/navigation'
export default function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  useEffect(() => {
    console.log(sessionId)
    fetch(`/api?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === 'open') {
    return (
      redirect('/')
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null;
}