import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/rem",
    timeout: 10000,
    withCredentials: true
})

export default instance