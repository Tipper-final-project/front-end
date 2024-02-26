"use client";
import qr from "qrcode";
import { useState, useEffect } from "react";
import getUser from "../../../APIcalls/getuser";
import Header from "@/app/Components/Header.js";
import "../../../../src/output.css";
import Loading from "@/app/Components/Loading";
import Error from "@/app/Components/Error";

const QRCode = ({ params }) => {
  const [qrImage, setQrImage] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const username = params.username;

  useEffect(() => {
    getUser(username, setUserDetails, setIsLoading);
    setIsLoading(false);
    setError(error);
  }, []);

  if (isLoading) return <Loading />;

  if (error) return <Error error={error} />;

  const generateQR = async (text, func) => {
    let isMounted = true;
    try {
      const img = await qr.toDataURL(text);
      if (isMounted) {
        func(img);
      }
      return () => {
        isMounted = false;
      };
    } catch (err) {
      console.error(err);
    }
  };
  
  generateQR(`/${userDetails.username}`, setQrImage);
  return (
    <>
      <Header />
      <main className="qr-page">
        <h2>{userDetails.firstName}</h2>
        <img className="rouded mx-auto d-block profile-pic" src={userDetails.img} alt="profile picture"></img>
        <div>
          <img
            className=" mx-auto d-block qr-code"
            src={qrImage}
            alt="qr code"
          />
          <h3>Scan me</h3>
        </div>
      </main>
    </>
  );
};

export default QRCode;
