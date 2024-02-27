import axios from "axios";

async function patchUser(username, newDetails) {
  try {
    // console.log(username, newDetails);
    const response = await axios.patch(
      `https://tipper-api-xzkf.onrender.com/waiter/${username}`,
      newDetails
    );
  } catch (err) {
    console.log(err);
    document.getElementById("approveUpload").disabled = false;
  }
}

export default patchUser;
