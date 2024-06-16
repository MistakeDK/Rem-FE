import { Order, PromotionType } from "~/config/Types";
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
};
const calculateTotal = (Order: Order) => {
    Order.valueVoucher = Order.valueVoucher || 0
    let sum = Order.orderDetails.reduce((acc, value) => acc + value.price * value.quantity, 0)
    if (Order.promotionType == PromotionType.DIRECT) {
        sum -= Order.valueVoucher
    } else if (Order.promotionType == PromotionType.PERCENT) {
        sum -= sum * Order.valueVoucher / 100
    }
    return sum
}

const Util = {
    formatDate,
    calculateTotal
}
export default Util