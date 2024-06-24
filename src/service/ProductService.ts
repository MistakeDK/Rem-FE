
import { formProduct } from "~/config/Types"
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
const create = (data: formProduct) => {
    return axios({
        url: '/products',
        method: "POST",
        data: {
            ...data
        }
    })
}
const edit = (id: string, data: formProduct) => {
    return axios({
        url: `/products/update/${id}`,
        method: "PUT",
        data: {
            ...data
        }
    })
}
const uploadImg = (data: FormData) => {
    return axios({
        url: '/products/upload',
        method: "POST",
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
const ProductService = {
    getList,
    getById,
    create,
    edit,
    uploadImg
}
export default ProductService