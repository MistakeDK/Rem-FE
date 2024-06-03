import axios from "~/service/axios"
const getList = (id: string) => {
    return axios({
        url: `/carts/getList/${id}`
    })
}
const changeQuantity = (id: string, productId: string, action: string, quantity = 1) => {
    return axios({
        url: `/carts/changeQuantity/${id}`,
        method: "POST",
        data: {
            productId: productId,
            action: action,
            quantity: quantity
        }
    })
}
const CartService = {
    getList,
    changeQuantity
}
export default CartService