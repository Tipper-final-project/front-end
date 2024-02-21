import axios from "axios";

export default function postUser(
  information,
  setIsLoading,
  setPostedStatus,
  setIsError
) {
  return axios
    .post(`https://tipper-api-xzkf.onrender.com/waiter`, {
      username: information.username,
      bio: information.bio,
      workPlace: information.workPlace,
      email: information.email,
      img: information.img,
      firstName: information.firstName,
      lastName: information.lastName,
    })
    .then(() => {
      setIsLoading(false);
      setPostedStatus(true);
    })
    .catch((err) => {
      document.getElementById("submitButton").disabled = false;
      document.getElementById("cancelUpload").disabled = false;
      setIsLoading(false);
      setPostedStatus(false);
      setIsError(true);
      console.log(err);
    });
}
