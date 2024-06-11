import axios from "~/service/axios"
const paymentVNPay = (param: URLSearchParams, orderId: string) => {
    return axios({
        url: `/payment/vn-pay/${orderId}?${param}`,
        method: "GET",
    })
}
const PaymentService = {
    paymentVNPay
}
export default PaymentService