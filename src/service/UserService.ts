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
const signUp = (data: FormDataSignUp) => {
    return axios({
        url: `/users`,
        method: "POST",
        data: {
            ...data
        }
    })
}
const verifyAccount = (code: string) => {
    return axios({
        url: `/users/${code}`,
        method: "PATCH",
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
    signUp,
    getMyInfo
}
export default UserService