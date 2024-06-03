import axios from "~/service/axios"
const getById = (id: string) => {
    return axios({
        url: `/promotions/${id}`,
        method: "GET"
    })
}
const PromotionService = {
    getById
}
export default PromotionService