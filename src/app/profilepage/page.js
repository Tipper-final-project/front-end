"use client";
import { useContext, useState } from "react";
import userdetailsContext from "@/context/usercontext";
import Editfield from "@/reusable components/editfield";
import deleteUser from "@/APIcalls/deleteUser";

const ProfilePage = () => {
  const { userDetails } = useContext(userdetailsContext);
  const [editWorkplace, setEditWorkplace] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [editUsername, setEditUsername] = useState(false);

  return (
    <main className="profilepage">
      <a href="/">
        <button className="logoutbtn">Log out</button>
      </a>
      <div>
    <img className="rouded mx-auto d-block" src={userDetails.img}></img>
      </div>
      <div>
        <h2>
          {userDetails.firstName} {userDetails.lastName}
        </h2>
      </div>
      <div>
        <h3 className="username">Hello {userDetails.username}</h3>
        {editUsername ? null : (
          <button
            onClick={() => {
              setEditUsername(true);
            }}
          >
            Edit
          </button>
        )}
      </div>
      {editUsername ? (
        <Editfield
          func={setEditUsername}
          value={"username"}
          username={userDetails.username}
        />
      ) : null}
      <h3 className="bio">Bio</h3>
      <div>
        <p>{userDetails.bio}</p>
        {editBio ? null : (
          <button
            onClick={() => {
              setEditBio(true);
            }}
          >
            Edit
          </button>
        )}
      </div>
      {editBio ? (
        <Editfield
          func={setEditBio}
          value={"bio"}
          username={userDetails.username}
        />
      ) : null}
      <div>
        <h5>Email: {userDetails.email}</h5>
        {editEmail ? null : (
          <button
            onClick={() => {
              setEditEmail(true);
            }}
          >
            Edit
          </button>
        )}
      </div>
      {editEmail ? (
        <Editfield
          func={setEditEmail}
          value={"email"}
          username={userDetails.username}
        />
      ) : null}
      <div>
        <h5>Workplaece: {userDetails.workPlace}</h5>
        {editWorkplace ? null : (
          <button
            onClick={() => {
              setEditWorkplace(true);
            }}
          >
            Edit
          </button>
        )}
      </div>

      {editWorkplace ? (
        <Editfield
          func={setEditWorkplace}
          value={"workPlace"}
          username={userDetails.username}
        />
      ) : null}
      <a href="/">
        <button
          onClick={() => {
            deleteUser(userDetails.username);
          }}
        >
          Delete account
        </button>
        </a>
      <a href={`/${userDetails.username}/qr-code`} className="btn btn-primary">
        Get QR-code
      </a>
      <a href={`/${userDetails.username}`} className="btn btn-primary">
        Stripe
      </a>
    </main>
  );
};

export default ProfilePage;
