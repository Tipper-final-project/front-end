import Link from "next/link";


const ProfilePage = () => {
 return  (
   <main className="profilepage">
      <a href="/" className="btn btn-primary">Home</a>
      <h1>Profilepage</h1>
      <img className="rouded mx-auto d-block" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"></img>
      <h2>Name</h2>
      <h2>Bio</h2>
      <button>Delete account</button>
   </main>
 )
}

export default ProfilePage;