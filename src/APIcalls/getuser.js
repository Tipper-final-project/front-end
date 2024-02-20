import axios from "axios";

export default async function getUser(username) {
  const response = await axios.get(
    `https://tipper-api-xzkf.onrender.com/waiter/${username}`
  );
  console.log(response.data);
}
