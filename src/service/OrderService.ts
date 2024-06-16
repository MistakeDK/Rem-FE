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
const OrderService = {
    CreateOrder,
    getOrderById
}
export default OrderService