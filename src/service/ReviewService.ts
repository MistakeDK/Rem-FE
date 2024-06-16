import axios from "~/service/axios"
import { reviewCreation } from "~/config/Types"
const sendReview = (data: reviewCreation) => {
    return axios({
        url: "/reviews",
        method: "POST",
        data: {
            ...data
        }
    })
}
const getReviewByProduct = (id: string, params: URLSearchParams) => {
    return axios({
        url: `/reviews/${id}`,
        method: "GET",
        params: params
    })
}
const ReviewService = {
    sendReview,
    getReviewByProduct
}
export default ReviewService