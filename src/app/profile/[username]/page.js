"use client";
import { useEffect, useState } from "react";
import Editfield from "@/reusable components/editfield";
import deleteUser from "@/APIcalls/deleteUser";
import getUser from "@/APIcalls/getuser";
import { useRouter } from "next/navigation";
import Image from "next/image";
import background from '../../../../src/background.png'

const UsernameError = ({ setIsTime }) => {
  setTimeout(() => {
    setIsTime("now");
  }, 5000);
  return <p>Username is taken</p>;
};

const ProfilePage = ({ params }) => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [editWorkplace, setEditWorkplace] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [changingUserName, setChangingUserName] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [isTime, setIsTime] = useState(null);
  useEffect(() => {
    getUser(params.username, setUserDetails, setIsLoading);
  }, []);

  return isLoading ? (
    <p>Currently Loading</p>
  ) : (
    <div className="background" style={{ zIndex: 0, position: 'fixed', width: '100%', height: '100%'}}>
    <Image src={background} placeholder="blur" layout="fill" objectFit="cover" alt="background image"/>
      <div className="logoutbtn">
        <a href="/">
          <button className="btn btn-outline-primary btn-sm">Log out</button>
        </a>
      </div>
      <div className="card" style={{ width: "90%", margin: "auto" }}>
        <img
          src={userDetails.img_url}
          className="card-img-top"
          alt={`an image of ${userDetails.username}`}
        />
        <div className="card-body">
          <div className="profileDiv">
            <h2 className="card-title">Hello {userDetails.username}</h2>
            {editUsername ? null : (
              <button
                onClick={() => {
                  setEditUsername(true);
                  setUsernameTaken(false);
                }}
                className="btn btn-outline-primary btn-sm"
              >
                Edit
              </button>
            )}
          </div>
          {usernameTaken && !isTime ? (
            <UsernameError setIsTime={setIsTime} />
          ) : null}
          {editUsername ? (
            <Editfield
              setUsernameTaken={setUsernameTaken}
              setChangingUserName={setChangingUserName}
              func2={setUserDetails}
              func={setEditUsername}
              value={"username"}
              username={userDetails.username}
            />
          ) : null}
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div>
              <h6>Email</h6>
            </div>
            <div className="profileDiv">
              {userDetails.email}{" "}
              {editEmail ? null : (
                <button
                  onClick={() => {
                    setEditEmail(true);
                  }}
                  className="btn btn-outline-primary btn-sm"
                >
                  Edit
                </button>
              )}
            </div>
            {editEmail ? (
              <Editfield
                func2={setUserDetails}
                func={setEditEmail}
                value={"email"}
                username={userDetails.username}
              />
            ) : null}
          </li>
          <li className="list-group-item">
            <div>
              <div>
                <h6 className="card-title">Bio</h6>
              </div>
              <div className="profileDiv">
                <p className="card-text">{userDetails.bio}</p>
                {editBio ? null : (
                  <button
                    onClick={() => {
                      setEditBio(true);
                    }}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Edit
                  </button>
                )}
              </div>
              {editBio ? (
                <Editfield
                  func2={setUserDetails}
                  func={setEditBio}
                  value={"bio"}
                  username={userDetails.username}
                />
              ) : null}
            </div>
          </li>
          <li className="list-group-item">
            <div>
              <h6>Workplace</h6>
            </div>
            <div className="profileDiv">
              <p> {userDetails.workPlace}</p>
              {editWorkplace ? null : (
                <button
                  onClick={() => {
                    setEditWorkplace(true);
                  }}
                  className="btn btn-outline-primary btn-sm"
                >
                  Edit
                </button>
              )}
            </div>
            {editWorkplace ? (
              <Editfield
                func2={setUserDetails}
                func={setEditWorkplace}
                value={"workPlace"}
                username={userDetails.username}
              />
            ) : null}
          </li>
        </ul>
        <div className="card-body">
          <button
            onClick={() => {
              setDeleteWarning(true);
            }}
            className="btn btn-outline-danger btn-sm"
          >
            Delete account
          </button>
          <a
            href={`/${userDetails.username}/qr-code`}
            className="btn btn-outline-primary btn-sm"
          >
            Get QR-code
          </a>
          <a
            href={`/${userDetails.username}`}
            className="btn btn-outline-primary btn-sm"
          >
            Stripe
          </a>

          {deleteWarning ? (
            <div className="deleteField">
              <div>
                <p>Once you delete your account it cannot be recovered</p>
              </div>
              <div className="warning">
                <div className="confirmDelete">
                  <button
                    onClick={() => {
                      deleteUser(userDetails.username);
                      route.push("/");
                    }}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => {
                      setDeleteWarning(false);
                    }}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
