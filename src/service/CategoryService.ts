import { category } from "~/config/Types";
import axios from "~/service/axios";
const getList = (params: URLSearchParams = new URLSearchParams) => {
    return axios({
        url: '/category',
        method: "GET",
        params: params
    })
}
const create = (name: string) => {
    return axios({
        url: '/category',
        method: "POST",
        data: {
            name: name
        }
    })
}
const CategoryService = {
    getList,
    create
}
export default CategoryService