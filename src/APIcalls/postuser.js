import axios from "axios";

export default async function postUser(
  information,
  setIsLoading,
  setPostedStatus,
  setIsError,
  encryptedString
) {
  return axios
    .post(`https://tipper-api-xzkf.onrender.com/waiter`, {
      username: information.username,
      bio: information.bio,
      workPlace: information.workPlace,
      email: information.email,
      img_url: information.img,
      firstName: information.firstName,
      lastName: information.lastName,
      password: encryptedString,
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
