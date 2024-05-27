
import axios from "~/service/axios"
const getList = (params: URLSearchParams | string) => {
    return axios({
        url: `/products?${params}`,
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