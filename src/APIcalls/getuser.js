import axios from "axios";

export default async function getUser(
  username,
  setUserDetails,
  setIsLoggedin,
  setLoginError
) {
  try {
    const response = await axios.get(
      `https://tipper-api-xzkf.onrender.com/waiter/${username}`
    );
    const { waiter } = response.data;
    setUserDetails(waiter);
    setIsLoggedin(true);
  } catch (error) {
    if (error.response.data.msg === "Not found") {
      setLoginError({ type: "username", msg: "Username does not exist" });
    }
  }
}
