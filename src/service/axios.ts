import axios, { AxiosResponse } from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/rem",
    timeout: 10000,
    withCredentials: true
})
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('refreshToken')
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
    (res: AxiosResponse) => {
        return res
    }
)


export default instance