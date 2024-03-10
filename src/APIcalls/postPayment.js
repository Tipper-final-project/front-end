import axios from "axios";

export default function postPayment(sessionid) {
  return axios
    .post(`https://backend-j38q.onrender.com/payments`, {
      sessionID: sessionid,
    })
    .catch((err) => {
      console.log(err);
    });
}
