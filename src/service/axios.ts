import axios, { AxiosError, AxiosResponse } from "axios";
import UserService from "./UserService";


const instance = axios.create({
    baseURL: "http://localhost:8080/rem",
    withCredentials: true
})
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)
instance.interceptors.response.use(
    async (res) => {
        const authorizationHeader = res.headers['authorization'];
        if (authorizationHeader) {
            const newToken = authorizationHeader.replace('Bearer ', '');
            localStorage.setItem('token', newToken);
        }
        return res;
    },
    (err) => {
        console.log(err)
        return Promise.reject(err)
    }
)


export default instance