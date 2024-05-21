import axios, { AxiosResponse } from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/rem",
    timeout: 10000,
    withCredentials: true
})
instance.interceptors.response.use(
    (res: AxiosResponse) => {
        return res
    }
)


export default instance