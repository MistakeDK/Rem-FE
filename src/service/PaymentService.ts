import axios from "~/service/axios"
const paymentVNPay = (total: number, orderId: string) => {
    const urlParam = new URLSearchParams()
    urlParam.set("amount", total.toString())
    urlParam.set("bankCode", "NCB")
    return axios({
        url: `/payment/vn-pay/${orderId}`,
        method: "GET",
        params: urlParam
    })
}
const PaymentService = {
    paymentVNPay
}
export default PaymentService