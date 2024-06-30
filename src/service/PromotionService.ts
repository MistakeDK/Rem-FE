import { promotion } from "~/config/Types"
import axios from "~/service/axios"

const addPromotion = (formPromotion: promotion) => {
    return axios({
        url: "/promotions",
        method: "POST",
        data: formPromotion
    })
}

const getList = (param: URLSearchParams) => {
    return axios({
        url: "/promotions",
        method: "GET",
        params: param,
    })
}
const getById = (id: string) => {
    return axios({
        url: `/promotions/${id}`,
        method: "GET"
    })
}
const changeStatus = (id: string) => {
    return axios({
        url: `/promotions/ChangeStatus/${id}`,
        method: "PATCH",
    })
}
const PromotionService = {
    getById,
    getList,
    addPromotion,
    changeStatus
}
export default PromotionService