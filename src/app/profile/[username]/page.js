"use client";
import { useEffect, useState } from "react";
import Editfield from "@/reusable components/editfield";
import deleteUser from "@/APIcalls/deleteUser";
import getUser from "@/APIcalls/getuser";
import { useRouter } from "next/navigation";
import patchUser from "@/APIcalls/patchUser";

const ProfilePage = ({ params }) => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [editWorkplace, setEditWorkplace] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [image, setImage] = useState("");
  const [imageConfirm, setImageConfirm] = useState(false);
  useEffect(() => {
    getUser(params.username, setUserDetails, setIsLoading);
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
    <p>Currently Loading</p>
  ) : (
    // <main className="profilepage">
    //   <a href="/">
    //     <button className="logoutbtn">Log out</button>
    //   </a>
    //   <div>
    //     <img className="rouded mx-auto d-block" src={userDetails.img}></img>
    //   </div>
    //   <div>
    //     <h2>
    //       {userDetails.firstName} {userDetails.lastName}
    //     </h2>
    //   </div>
    //   <div>
    //     <h3 className="username">Hello {userDetails.username}</h3>
    //     {editUsername ? null : (
    //       <button
    //         onClick={() => {
    //           setEditUsername(true);
    //         }}
    //       >
    //         Edit
    //       </button>
    //     )}
    //   </div>
    //   {editUsername ? (
    //     <Editfield
    //       func={setEditUsername}
    //       value={"username"}
    //       username={userDetails.username}
    //     />
    //   ) : null}
    //   <h3 className="bio">Bio</h3>
    //   <div>
    //     <p>{userDetails.bio}</p>
    //     {editBio ? null : (
    //       <button
    //         onClick={() => {
    //           setEditBio(true);
    //         }}
    //       >
    //         Edit
    //       </button>
    //     )}
    //   </div>
    //   {editBio ? (
    //     <Editfield
    //       func={setEditBio}
    //       value={"bio"}
    //       username={userDetails.username}
    //     />
    //   ) : null}
    //   <div>
    //     <h5>Email: {userDetails.email}</h5>
    //     {editEmail ? null : (
    //       <button
    //         onClick={() => {
    //           setEditEmail(true);
    //         }}
    //       >
    //         Edit
    //       </button>
    //     )}
    //   </div>
    //   {editEmail ? (
    //     <Editfield
    //       func={setEditEmail}
    //       value={"email"}
    //       username={userDetails.username}
    //     />
    //   ) : null}
    //   <div>
    //     <h5>Workplaece: {userDetails.workPlace}</h5>
    //     {editWorkplace ? null : (
    //       <button
    //         onClick={() => {
    //           setEditWorkplace(true);
    //         }}
    //       >
    //         Edit
    //       </button>
    //     )}
    //   </div>

    //   {editWorkplace ? (
    //     <Editfield
    //       func={setEditWorkplace}
    //       value={"workPlace"}
    //       username={userDetails.username}
    //     />
    //   ) : null}

    //   <button
    //     onClick={() => {
    //       setDeleteWarning(true);
    //     }}
    //   >
    //     Delete account
    //   </button>
    //   {deleteWarning ? (
    //     <div className="deleteField">
    //       <div>
    //         <p>Once you delete your account it cannot be recovered</p>
    //       </div>
    //       <div className="warning">
    //         <button
    //           onClick={() => {
    //             deleteUser(userDetails.username);
    //             route.push("/");
    //           }}
    //         >
    //           Continue
    //         </button>
    //         <button
    //           onClick={() => {
    //             setDeleteWarning(false);
    //           }}
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //     </div>
    //   ) : null}
    //   <a href={`/${userDetails.username}/qr-code`} className="btn btn-primary">
    //     Get QR-code
    //   </a>
    //   <a href={`/${userDetails.username}`} className="btn btn-primary">
    //     Stripe
    //   </a>
    // </main>
    <div>
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
            <p className="card-title">Edit image</p>
            {editImage ? null : (
              <button
                onClick={() => {
                  setEditImage(true);
                }}
                className="btn btn-outline-primary btn-sm"
              >
                Edit
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
            <div>
              <img src={image} width={"300px"} />
              <button
                id="approveUpload"
                style={{ marginRight: "7px" }}
                type="button"
                className="btn btn-success"
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
                className="btn btn-danger"
                onClick={() => {
                  setEditImage(false);
                  setImageConfirm(false);
                }}
              >
                Cancel
              </button>
            </div>
          ) : null}
        </div>
        <div className="card-body">
          <div className="profileDiv">
            <h2 className="card-title">Hello {userDetails.username}</h2>
            {editUsername ? null : (
              <button
                onClick={() => {
                  setEditUsername(true);
                }}
                className="btn btn-outline-primary btn-sm"
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
