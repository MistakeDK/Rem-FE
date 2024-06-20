import { FormDataSignUp } from "~/config/Types";
import axios from "~/service/axios";
const login = (username: string, password: string) => {
    return axios({
        url: `/auth/logIn`,
        method: "POST",
        data: {
            username: username,
            password: password
        }
    })
}
const outbounndLogin = (code: string) => {
    return axios({
        url: `/auth/outbound/authentication`,
        method: "POST",
        params: {
            code: code
        }
    })
}
const signUp = (data: FormDataSignUp) => {
    return axios({
        url: `/users`,
        method: "POST",
        data: {
            ...data
        }
    })
}
const logOut = () => {
    return axios({
        url: "/auth/logout",
        method: "POST",
        data: {
            token: localStorage.getItem("token")
        }
    })
}
const refreshToken = (token: string) => {
    return axios({
        url: '/auth/refresh',
        method: "POST",
        data: {
            token: token
        }
    })
}
const verifyAccount = (code: string, username: string) => {
    return axios({
        url: `/users/${username}`,
        method: "PATCH",
        params: {
            code: code
        }
    })
}
const getMyInfo = () => {
    return axios({
        url: `/users/myInfo`,
        method: "GET"
    })
}
const UserService = {
    verifyAccount,
    login,
    outbounndLogin,
    signUp,
    refreshToken,
    getMyInfo,
    logOut
}
export default UserService