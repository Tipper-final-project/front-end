"use client";
import { useEffect, useState } from "react";
import Editfield from "@/reusable components/editfield";
import deleteUser from "@/APIcalls/deleteUser";
import getUser from "@/APIcalls/getuser";
import { useRouter } from "next/navigation";
import patchUser from "@/APIcalls/patchUser";
import LogoutButton from "../../Components/LogoutButton";
import Loading from "@/app/Components/Loading";
import getMessages from "@/APIcalls/messages";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
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
  const [messages, setMessages] = useState(null);
  const [editImage, setEditImage] = useState(false);
  const [image, setImage] = useState("");
  const [imageConfirm, setImageConfirm] = useState(false);
  const [hideMessagePreview, setHideMessagePreview] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);
  const [changingUserName, setChangingUserName] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [isTime, setIsTime] = useState(null);

  useEffect(() => {
    getUser(params.username, setUserDetails, setIsLoading);
    getMessages(params.username, setMessages);
  }, []);
  function handleImagePatch(event) {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImage(data.result);
    });
    if (event.target.files[0]) {
      data.readAsDataURL(event.target.files[0]);
    }
    setImageConfirm(true);
    // patchUser(userDetails.username, { img_url: image });
  }
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="logout-button">
        {hideMessagePreview && !openMessages ? (
          <button
            className="btn btn-sm showMessages"
            onClick={() => {
              setOpenMessages(true);
            }}
          >
            Messages
          </button>
        ) : null}
        <LogoutButton />
      </div>
      <div className="profile-page-user">
        <div className="messageCard">
          {messages && openMessages ? (
            <Card style={{ width: "18rem" }}>
              <div className="closeMessagesDiv">
                <button
                  className="btn btn-sm closeMessages"
                  onClick={() => {
                    setOpenMessages(false);
                  }}
                >
                  Close
                </button>
              </div>
              <ListGroup variant="flush">
                {messages.slice(0, 5).map((message, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      Recieved ${message.recieved}.00 at{" "}
                      {message.date.slice(0, 10)} {message.date.slice(11, 16)}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card>
          ) : null}
          {messages && !hideMessagePreview
            ? messages.slice(0, 1).map((message, index) => (
                <Card style={{ width: "18rem" }} key={index}>
                  <Card.Body>
                    <div className="messageButton">
                      <button
                        className="btn btn-sm edit-button"
                        onClick={() => {
                          setHideMessagePreview(true);
                        }}
                      >
                        Hide
                      </button>
                    </div>
                    <Card.Title>Recent payment</Card.Title>
                    <Card.Text>
                      recieved ${message.recieved}.00 on{" "}
                      {message.date.slice(0, 10)} {message.date.slice(11, 16)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            : null}
        </div>
        <div className="card" style={{ width: "90%", margin: "auto" }}>
          <img
            src={userDetails.img_url}
            className="card-img-top"
            alt={`an image of ${userDetails.username}`}
          />
          <div className="card-body">
            <div className="profileDiv">
              {editImage ? null : (
                <button
                  onClick={() => {
                    setEditImage(true);
                  }}
                  className="btn btn-sm edit-img-button"
                >
                  Edit image
                </button>
              )}
            </div>
            {editImage ? (
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  id="img"
                  aria-label="Upload"
                  accept=".jpg, .png"
                  onChange={handleImagePatch}
                  required
                />
              </div>
            ) : null}
            {imageConfirm ? (
              <div className="new-selected-image" style={{}}>
                <img
                  src={image}
                  style={{
                    width: 60 + "%",
                    paddingTop: 15 + "px",
                    paddingBottom: 15 + "px",
                    
                  }}
                  className="uploaded-img"
                  id="uploaded-img-id"
                />
                <div className="button-section">
                  <button
                    id="approveUpload"
                    style={{ marginRight: "7px" }}
                    type="button"
                    className="btn btn-success btn-sm approve-new-image"
                    onClick={() => {
                      document.getElementById("approveUpload").disabled = true;
                      patchUser(userDetails.username, { img_url: image }).then(
                        () => {
                          setImageConfirm(false);
                          setEditImage(false);
                          userDetails.img_url = image;
                        }
                      );
                    }}
                  >
                    Approve
                  </button>
                  <button
                    id="cancelNewUpload"
                    type="button"
                    className="btn btn-danger btn-sm cancel-new-image"
                    onClick={() => {
                      setEditImage(false);
                      setImageConfirm(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <div className="card-body">
            <div className="profileDiv">
              <h2 className="card-greeting">Hello {userDetails.username}!</h2>
              {editUsername ? null : (
                <button
                  onClick={() => {
                    setEditUsername(true);
                    setUsernameTaken(false);
                  }}
                  className="btn btn-sm edit-button"
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
                <p className="card-title">Email:</p>
              </div>
              <div className="profileDiv">
                {userDetails.email}{" "}
                {editEmail ? null : (
                  <button
                    onClick={() => {
                      setEditEmail(true);
                    }}
                    className="btn edit-button btn-sm"
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
                  <p className="card-title">Bio:</p>
                </div>
                <div className="profileDiv">
                  <p className="card-text">{userDetails.bio}</p>
                  {editBio ? null : (
                    <button
                      onClick={() => {
                        setEditBio(true);
                      }}
                      className="btn edit-button btn-sm"
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
                <p className="card-title">Workplace:</p>
              </div>
              <div className="profileDiv">
                <p> {userDetails.workPlace}</p>
                {editWorkplace ? null : (
                  <button
                    onClick={() => {
                      setEditWorkplace(true);
                    }}
                    className="btn edit-button btn-sm"
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
          <div className="card-body button-card">
            {" "}
            <a
              href={`/${userDetails.username}/qr-code`}
              className="btn qr-button"
            >
              Get QR-code
            </a>
            <button
              onClick={() => {
                setDeleteWarning(true);
              }}
              className="btn btn-outline-danger btn-sm delete-btn"
            >
              Delete account
            </button>
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
                      className="btn btn-outline-danger btn-sm confirmDelete-btn"
                    >
                      Continue
                    </button>
                    <button
                      onClick={() => {
                        setDeleteWarning(false);
                      }}
                      className="btn btn-outline-danger btn-sm cancelDelete-btn"
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
    </>
  );
};

export default ProfilePage;
