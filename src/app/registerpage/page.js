// "use client";
// import postUser from "@/APIcalls/postuser";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// const RegisterPage = () => {
//   const router = useRouter()
//   const [image, setImage] = useState(null);
//   const [information, setInformation] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [postedStatus, setPostedStatus] = useState(false);
//   const [isError, setIsError] = useState(false);

//   function handleImage(event) {
//     const data = new FileReader();
//     data.addEventListener("load", () => {
//       setImage(data.result);
//     });
//     if (event.target.files[0]) {
//       data.readAsDataURL(event.target.files[0]);
//     }
//   }

//   function handleChange(event) {
//     setInformation((currentInformation) => {
//       const newInformation = { ...currentInformation };
//       newInformation[event.target.id] = event.target.value;
//       return newInformation;
//     });
//   }

//   useEffect(() => {
//     setInformation((currentInformation) => {
//       const newInformation = { ...currentInformation };
//       newInformation.img = image;
//       return newInformation;
//     });
//   }, [image]);

//   function handleSubmit(event) {
//     setIsError(false);
//     setIsLoading(true);
//     document.getElementById("submitButton").disabled = true;
//     document.getElementById("cancelUpload").disabled = true;

//     postUser(information, setIsLoading, setPostedStatus, setIsError);
//     event.preventDefault();
//   }

//   return (
//     <>
//       <a href="/" className="btn btn-primary">
//         Home
//       </a>
//       <h1 style={{ textAlign: "center" }}>Registration Page</h1>
//       <form
//         className="row g-3"
//         onSubmit={handleSubmit}
//         style={{ width: "70%", margin: "auto" }}
//       >
//         <div className="col-md-6">
//           <label htmlFor="firstName" className="form-label">
//             Firstname
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="firstName"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="lastName" className="form-label">
//             Lastname
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="lastName"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="username" className="form-label">
//             Username
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="username"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="password"
//             onChange={handleChange}
//             // required
//           />
//         </div>

//         <div className="col-md-6">
//           <label htmlFor="workPlace" className="form-label">
//             Workplace
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="workPlace"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="input-group">
//           <span className="input-group-text">Bio</span>
//           <textarea
//             id="bio"
//             className="form-control"
//             placeholder="Tell us a bit about yourself"
//             aria-label="Bio input"
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>

//         <div className="input-group">
//           <input
//             type="file"
//             className="form-control"
//             id="img"
//             aria-label="Upload"
//             accept=".jpg, .png"
//             onChange={handleImage}
//             required
//           />
//         </div>
//         {image ? (
//           <div>
//             <img
//               src={image}
//               style={{
//                 width: "300px",
//                 height: "300px",
//               }}
//             />
//             <button
//               id="cancelUpload"
//               type="button"
//               className="btn btn-danger"
//               onClick={() => {
//                 setImage(null);
//               }}
//             >
//               Cancel upload
//             </button>
//           </div>
//         ) : null}

//         <div className="col-12">
//           <button id="submitButton" type="submit" className="btn btn-primary">
//             Sign in
//           </button>
//           {postedStatus ? (
//             <a
//               {router.push('/profilepage')}
//               className="btn btn-success"
//               style={{ width: "170px", marginLeft: "10px" }}
//             >
//               Go to profile page
//             </a>
//           ) : null}
//         </div>

//         {isLoading ? (
//           <p>Please wait while we create your profile page</p>
//         ) : null}
//         {isError ? <p>Please wait while we create your profile page</p> : null}
//       </form>
//     </>
//   );
// };

// export default RegisterPage;


// Import necessary modules
"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import postUser from '@/APIcalls/postuser';



// Your registration component
const RegisterPage = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [information, setInformation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [postedStatus, setPostedStatus] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleImage(event) {
    const data = new FileReader();
    data.addEventListener('load', () => {
      setImage(data.result);
    });
    if (event.target.files[0]) {
      data.readAsDataURL(event.target.files[0]);
    }
  }

  function handleChange(event) {
    setInformation((currentInformation) => {
      const newInformation = { ...currentInformation };
      newInformation[event.target.id] = event.target.value;
      return newInformation;
    });
  }

  useEffect(() => {
    setInformation((currentInformation) => {
      const newInformation = { ...currentInformation };
      newInformation.img = image;
      return newInformation;
    });
  }, [image]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);
    setPostedStatus(true)
    document.getElementById('submitButton').disabled = true;
    document.getElementById('cancelUpload').disabled = true;
    postUser(information, setIsLoading, setPostedStatus, setIsError);
  
    try {
      await postUser(information);
      setPostedStatus(true);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (postedStatus) {
      router.push('/');
    }
  }, [postedStatus, router]);

  return (
    <>
      <a href="/" className="btn btn-primary">
        Home
      </a>
      <h1 style={{ textAlign: 'center' }}>Registration Page</h1>
      <form
        className="row g-3"
        onSubmit={handleSubmit}
        style={{ width: '70%', margin: 'auto' }}
      >
        <div className="col-md-6">
           <label htmlFor="firstName" className="form-label">
             Firstname
           </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">
            Lastname
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            onChange={handleChange}
            // required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="workPlace" className="form-label">
            Workplace
          </label>
          <input
            type="text"
            className="form-control"
            id="workPlace"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">Bio</span>
          <textarea
            id="bio"
            className="form-control"
            placeholder="Tell us a bit about yourself"
            aria-label="Bio input"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="input-group">
          <input
            type="file"
            className="form-control"
            id="img"
            aria-label="Upload"
            accept=".jpg, .png"
            onChange={handleImage}
            required
          />
        </div>
        {image ? (
          <div>
            <img
              src={image}
              style={{
                width: "300px",
                height: "300px",
              }}
            />
            <button
              id="cancelUpload"
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setImage(null);
              }}
            >
              Cancel upload
            </button>
          </div>
        ) : null}

        <div className="col-12">
          {postedStatus ? (
            <button
            onClick={() => router.push('/')}
            className="btn btn-success"
            style={{ width: "170px", marginLeft: "10px" }}
          >
            Go to profile page
          </button>
          ) : null}
        </div>

        <button id="submitButton" type="submit" className="btn btn-primary">
          Sign Up
        </button>
        {isLoading && (
          <p>Please wait while we create your profile page</p>
        )}
        {isError && (
          <p>Sorry, something went wrong. Please try again later.</p>
        )}
      </form>
    </>
  );
};

export default RegisterPage;
