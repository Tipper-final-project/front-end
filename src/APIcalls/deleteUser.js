import axios from "axios";

async function deleteUser(username) {
  try {
    await axios.delete(
      `https://tipper-api-xzkf.onrender.com/waiter/${username}`
    );
  } catch (err) {
    console.log(err);
  }
}

export default deleteUser;
