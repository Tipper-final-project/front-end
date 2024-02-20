import { useContext } from "react";
import userdetailsContext from "@/context/usercontext";

const ProfilePage = () => {
  const { userDetails } = useContext(userdetailsContext);
  console.log(userDetails);

  return (
    <main className="profilepage">
      <a href="/" className="btn btn-primary">
        Home
      </a>
      <img
        className="rouded mx-auto d-block"
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      ></img>
      <h2 className="username">Hello {userDetails.username}</h2>
      <h2 className="bio">Bio</h2>
      <p>{userDetails.bio}</p>
      <h2>Email: {userDetails.email}</h2>
      <h2>Workplaece: {userDetails.workPlace}</h2>
      <button>Delete account</button>
    </main>
  );
};

export default ProfilePage;
