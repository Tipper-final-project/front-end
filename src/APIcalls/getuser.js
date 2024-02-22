import { Crypt } from "@/app/registerpage/page";
import axios from "axios";

export default async function getUser(
  username,
  password,
  setUserDetails,
  setIsLoggedin,
  setLoginError
) {
  try {
    const response = await axios.get(
      `https://tipper-api-xzkf.onrender.com/waiter/${username}`
    );
    const { waiter } = response.data;

    if (Crypt.decrypt(waiter.password) === password) {
      setUserDetails ? setUserDetails(waiter) : null;
      setIsLoggedin ? setIsLoggedin(true) : null;
    }
  } catch (error) {
    if (error.response.data.msg === "Not found") {
      setLoginError({ type: "username", msg: "Username does not exist" });
    }
  }
}
