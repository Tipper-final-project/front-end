import axios from "axios";

export default function postPayment(sessionid, setStatus) {
    return axios
    .post(`https://tipper-api-xzkf.onrender.com/payments`, {
        sessionID: sessionid})
    .then((res) => {
        console.log(res);
        setStatus(null)
    })
    .catch((err) => {
        console.log(err);
    })
}