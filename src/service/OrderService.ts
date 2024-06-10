import axios from "~/service/axios"
enum paymentMethod {
    VNPAY = "VNPAY",
    CASH = "CASH"
}
interface formCheckOut {
    name: string,
    phone: string,
    address: string,
    paymentType: paymentMethod
}
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
const getOrderById = (idUser: string) => {
    return axios({
        url: `/orders/${idUser}`,
        method: "GET"
    })
}
const OrderService = {
    CreateOrder,
    getOrderById
}
export default OrderService