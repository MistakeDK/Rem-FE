import { AxiosError } from "axios";
import { ErrorCode } from "./ErrorCode";
interface error {
    code: number,
    message: string
}
interface CartItem {
    id: string,
    name: string,
    price: number,
    img: string,
    quantity: number,
    active: boolean
}
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
};
const subText = (text: string, length: number) => {
    if (text.length > length) return text.substring(0, length) + "..."
    return text
}
const SetErrorField = (err: AxiosError<error>) => {
    const code = err.response?.data.code
    return ErrorCode.get(code as number)
}
const calulateTotal = (cartItem: CartItem[]) => {
    return cartItem.reduce((total, item) => total + item.price * item.quantity, 0)
}
const ConvertNumberPage = (page: number) => {
    return page + 1
}
const Util = {
    formatDate,
    subText,
    SetErrorField,
    calulateTotal,
    ConvertNumberPage
}
export default Util