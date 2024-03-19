import { Crypt } from "@/app/registerpage/page";
import axios from "axios";

export default async function getUser(username, setUserDetails, setIsLoading) {
  try {
    return await axios.get(
      `https://backend-j38q.onrender.com/waiter/${username}`
    ).then((response) => {
      if(response) {
        const { waiter } = response.data;
        if (waiter._id === localStorage.pass) {
          setUserDetails(waiter);
          setIsLoading ? setIsLoading(false) : null;
        } else {
          setUserDetails({username: waiter.username, img_url: waiter.img_url, bio : waiter.bio});
          setIsLoading ? setIsLoading(false) : null;
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
export async function verifyUser(username, password, setLoginError) {
  try {
    return await axios.get(
      `https://backend-j38q.onrender.com/waiter/${username}`
    ).then((response) => {
      if(response) {
        const { waiter } = response.data;
        if (Crypt.decrypt(waiter.password) === password) {
          localStorage.pass = waiter._id;
          return true;
        } else {
          return Promise.reject({ password: "Invalid password" });
        }
      }
    });
  } catch (error) {
    if (error.response.data.msg === "Not found") {
      setLoginError({ username: "Username is not valid" });
    }
  }
}

export async function findUserName(user) {
  try {
    return await axios.get(
      `https://backend-j38q.onrender.com/check/${user}`
    ).then((result) => {
      return result.data.userExists;
    });
  } catch (error) {
    console.log(error);
  }
}
