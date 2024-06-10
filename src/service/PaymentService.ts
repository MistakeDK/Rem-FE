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
const paymentVNPay = (param: URLSearchParams, form: formCheckOut, promotionCode: string | null, userId: string) => {
    return axios({
        url: `/payment/vn-pay?${param}`,
        method: "POST",
        data: {
            ...form,
            promotionCode: promotionCode,
            userId: userId
        }
    })
}
const PaymentService = {
    paymentVNPay
}
export default PaymentService