import axios from "axios";

async function deleteUser(username) {
  try {
    console.log("hi")
    await axios.delete(
      `https://tipper-api-xzkf.onrender.com/waiter/${username}`
    );
  } catch (err) {
    console.log(err);
  }
}

export default deleteUser;
