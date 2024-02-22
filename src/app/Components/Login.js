// "use client";
// import React, { useState, useContext } from "react";
// import Link from "next/link";
// import getUser from "@/APIcalls/getuser";
// import userdetailsContext from "@/context/usercontext";
// import RegisterPage from "../registerpage/page";
// import ProfilePage from "../profilepage/page";

// const Login = () => {
//   const [usernameInput, setUsernameInput] = React.useState("");
//   const { setUserDetails, setIsLoggedin } = useContext(userdetailsContext);
//   const [loginError, setLoginError] = useState({});

//   function handleInput(event) {
//     setUsernameInput(event.target.value);
//   }

//   function handleLogin(event) {
//     event.preventDefault();
//     getUser(usernameInput, setUserDetails, setIsLoggedin, setLoginError);
//   }

//   return (
//     <form className="login-card" onSubmit={handleLogin}>
//       <div className="card " style={{ width: 540 + "px" }}>
//         <div className="card-header">Login/Register</div>
//         <div className="card-body">
//           <div className="input-group mb-3">
//             <span className="input-group-text" id="basic-addon1">
//               Username
//             </span>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Username"
//               aria-label="Username"
//               aria-describedby="basic-addon1"
//               onChange={handleInput}
//             />
//             {loginError.type === "username" ? (
//               <span>Username Does Not Exist</span>
//             ) : null}
//           </div>
//           <div className="input-group mb-3">
//             <span className="input-group-text" id="basic-addon1">
//               Password
//             </span>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Password"
//               aria-label="Username"
//               aria-describedby="basic-addon1"
//             />
//           </div>
//           <button href="/profilepage" className="btn btn-primary">
//             Login
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Login;


"use client";
import React, { useState, useContext } from "react";
import getUser from "@/APIcalls/getuser";
import userdetailsContext from "@/context/usercontext";

import Loading from "./Loading";
import RegisterPage from "../registerpage/page";
import ProfilePage from "../profilepage/page";


const Login = () => {
  const [usernameInput, setUsernameInput] = React.useState("");
  const { setUserDetails, setIsLoggedin } = useContext(userdetailsContext);
  const [loginError, setLoginError] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isLoggedin] = useState(true)

  function handleInput(event) {
    setUsernameInput(event.target.value);
  }

  function handleLogin(event) {
    event.preventDefault();
    getUser(usernameInput, setUserDetails, setIsLoggedin, setLoginError);
    setIsLoading(true);
    setIsLoading(false)
    setError(error);
  }

  if (isLoading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <div>
      {/*
        Conditionally render either the RegisterPage or ProfilePage based on the user's authentication status.
      */}
      {!isLoggedin ? (
        <RegisterPage />
      ) : (
        <form className="login-card" onSubmit={handleLogin}>
          <div className="card " style={{ width: 540 + "px" }}>
            <div className="card-header">Login/Register</div>
            <div className="card-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Username
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={handleInput}
                />
                {loginError.type === "username" ? (
                  <span>Username Does Not Exist</span>
                ) : null}
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Password
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <button className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
