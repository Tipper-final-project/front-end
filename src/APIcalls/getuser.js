import { Crypt } from "@/app/registerpage/page";
import axios from "axios";

export default async function getUser(username, setUserDetails, setIsLoading) {
  try {
    const response = await axios.get(
      `https://tipper-api-xzkf.onrender.com/waiter/${username}`
    );
    const { waiter } = response.data;
    if (waiter._id === localStorage.pass) {
      setUserDetails(waiter);
      setIsLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
}
export async function verifyUser(username, password) {
  try {
    const response = await axios.get(
      `https://tipper-api-xzkf.onrender.com/waiter/${username}`
    );
    const { waiter } = response.data;
    if (Crypt.decrypt(waiter.password) === password) {
      localStorage.pass = waiter._id;
      return true;
    } else {
      return false; // throw error here
    }
  } catch (error) {
    // if (error.response.data.msg === "Not found") {
    //   setLoginError({ type: "username", msg: "Username does not exist" });
    // }
  }
}
