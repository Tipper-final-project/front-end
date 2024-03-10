import axios from "axios";

async function deleteUser(username) {
  try {
    console.log("hi")
    await axios.delete(
      `https://backend-j38q.onrender.com/waiter/${username}`
    );
  } catch (err) {
    console.log(err);
  }
}

export default deleteUser;
