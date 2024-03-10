import axios from "axios";
import getSecondM from "../../utils/getSecondM";

const getMessages = async (username, setMessages) => {
  try {
    const response = await axios.get(
      `https://backend-j38q.onrender.com/messages/${username}`
    );
    const messages = getSecondM(response.data.messages);
    const sortParameter = "date";
    const sortedMessages = messages.sort((a, b) =>
      b[sortParameter].localeCompare(a[sortParameter])
    );
    setMessages(sortedMessages);
  } catch (error) {
    console.log(error);
  }
};

export default getMessages;

export const postMessage = async (username) => {
  try {
    await axios.post(
      `https://backend-j38q.onrender.com/messages/${username}`,
      { recieved: 5, date: new Date() }
    );
  } catch (error) {
    console.log(error);
  }
};
