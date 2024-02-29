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
      setIsLoading ? setIsLoading(false) : null;
    } else {
      setUserDetais({username: waiter.username, img_url: waiter.img_url, bio : waiter.bio});
      setIsLoading ? setIsLoading(false) : null;
  } catch (error) {
    console.log(error);
  }
}
export async function verifyUser(username, password, setLoginError) {
  try {
    const response = await axios.get(
      `https://tipper-api-xzkf.onrender.com/waiter/${username}`
    );
    const { waiter } = response.data;
    if (Crypt.decrypt(waiter.password) === password) {
      localStorage.pass = waiter._id;
      return true;
    } else {
      return Promise.reject({ password: "Invalid password" });
    }
  } catch (error) {
    if (error.response.data.msg === "Not found") {
      setLoginError({ username: "Username is not valid" });
    }
  }
}

export async function findUserName(user) {
  try {
    const result = await axios.get(
      `https://tipper-api-xzkf.onrender.com/check/${user}`
    );
    return result.data.userExists;
  } catch (error) {
    console.log(error);
  }
}
