
import axios from "~/service/axios"
const getList = () => {
    return axios({
        url: "/products",
        method: "GET"
    })
}
const getById = (id: string) => {
    return axios({
        url: `/products/${id}`,
        method: "GET"
    })
}
const ProductService = {
    getList,
    getById
}
export default ProductService