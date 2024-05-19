import axios from "~/service/axios";
const verifyAccount = (code: string) => {
    return axios({
        url: `/users/${code}`,
        method: "PATCH",
    })
}
const UserService = {
    verifyAccount
}
export default UserService