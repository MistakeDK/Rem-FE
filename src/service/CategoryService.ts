import axios from "~/service/axios";
const getList = () => {
    return axios({
        url: '/category',
        method: "GET"
    })
}
const CategoryService = {
    getList
}
export default CategoryService