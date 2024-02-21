"use client";
import { useContext, useState } from "react";
import userdetailsContext from "@/context/usercontext";
const Editfield = ({ setEditWorkplace }) => {
  return (
    <form>
      <input></input>
      <button
        onClick={() => {
          setEditWorkplace((prevstate) => !prevstate);
        }}
      >
        Save
      </button>
    </form>
  );
};

const ProfilePage = () => {
  const { userDetails } = useContext(userdetailsContext);
  const [editWorkplace, setEditWorkplace] = useState(false);
  console.log(editWorkplace);

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
      </div>
      <h3 className="bio">Bio</h3>
      <div>
        <p>{userDetails.bio}</p>
      </div>
      <div>
        <h5>Email: {userDetails.email}</h5>
      </div>
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
      {editWorkplace ? <Editfield setEditWorkplace={setEditWorkplace} /> : null}
      <button>Delete account</button>
      <a href={`/${userDetails.username}`} className="btn btn-primary">
            Stripe
          </a>
    </main>
  );
};

export default ProfilePage;
