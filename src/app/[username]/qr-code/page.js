"use client";
import qr from "qrcode";
import { useState, useEffect } from "react";
import getUser from "../../../APIcalls/getuser";
import "../../../../src/output.css";
import Loading from "@/app/Components/Loading";
import Error from "@/app/Components/Error";
import LogoutButton from "@/app/Components/LogoutButton";

const QRCode = ({ params }) => {
  const [qrImage, setQrImage] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const username = params.username;

  useEffect(() => {
    getUser(username, setUserDetails, setIsLoading);
    setError(error);
    generateQR(
      `https://front-end-eight-eta-57.vercel.app/${userDetails.username}`,
      setQrImage
    );
  }, []);

  if (error) return <Error error={error} />;

  const generateQR = async (text, func) => {
    try {
      const img = await qr.toDataURL(text);

      func(img);
    } catch (err) {
      console.error(err);
    }
  };

 
  return isLoading ? <Loading /> :
    <>
      <main className="qr-page">
        <LogoutButton />
        <h1 className="qr-name">
          Hello!<br></br>I am {userDetails.firstName}
        </h1>
        <img
          className="rounded mx-auto d-block profile-pic"
          src={userDetails.img_url}
          alt="profile picture"
        />

        <div className="qr-container">
          <img
            className="mx-auto d-block qr-code"
            src={qrImage}
            alt="qr code"
          />
          <h3>Scan Me!</h3>
        </div>
      </main>
    </>
};

export default QRCode;
