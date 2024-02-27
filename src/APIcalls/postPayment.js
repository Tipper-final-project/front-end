import axios from "axios";

export default function postPayment(sessionid) {
  return axios
    .post(`https://tipper-api-xzkf.onrender.com/payments`, {
      sessionID: sessionid,
    })
    .catch((err) => {
      console.log(err);
    });
}
