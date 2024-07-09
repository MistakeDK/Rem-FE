import axios from "~/service/axios"
import { formCheckOut } from "~/config/Types"
const CreateOrder = (formCheckOut: formCheckOut, promotionCode: string | null, userId: string) => {
    return axios({
        url: "/orders",
        method: "POST",
        data: {
            ...formCheckOut,
            promotionCode: promotionCode,
            userId: userId
        }
    })
}
const getOrderById = (idUser: string, param: URLSearchParams) => {
    return axios({
        url: `/orders/${idUser}`,
        method: "GET",
        params: param
    })
}
const getList = (param: URLSearchParams) => {
    return axios({
        url: "/orders/getList",
        method: "GET",
        params: param
    })
}
const getById = (id: string) => {
    return axios({
        url: `/orders/getById/${id}`,
        method: "GET"
    })
}
const changeStatus = (id: string) => {
    return axios({
        url: `/orders/changeStatus/${id}`,
        method: "PATCH"
    })
}
const getStat = () => {
    return axios({
        url: "/orders/getStat",
        method: "GET"
    })
}
const OrderService = {
    CreateOrder,
    getOrderById,
    getList,
    getById,
    changeStatus,
    getStat
}
export default OrderService