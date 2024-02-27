import axios from "axios";
import getSecondM from "../../utils/getSecondM";

const getMessages = async (username) => {
  try {
    const response = await axios.get(
      `https://tipper-api-xzkf.onrender.com/messages/${username}`
    );
    const messages = getSecondM(response.data.messages);
    console.log(messages);
  } catch (error) {
    console.log(error);
  }
};

export default getMessages;

export const postMessage = async (username) => {
  try {
    await axios.post(
      `https://tipper-api-xzkf.onrender.com/messages/${username}`,
      { recieved: 70, date: new Date() }
    );
  } catch (error) {
    console.log(error);
  }
};
