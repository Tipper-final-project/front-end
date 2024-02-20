import axios from "axios";

export default async function getUser(username, setUserDetails, setIsLoggedin) {
  const response = await axios.get(
    `https://tipper-api-xzkf.onrender.com/waiter/${username}`
  );
  const { waiter } = response.data;
  setUserDetails(waiter);
  setIsLoggedin(true);
}
