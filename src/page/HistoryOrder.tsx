import { Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HistoryOrderItem from '~/component/HistoryOrderItem'
import { RootState } from '~/redux/store'
import OrderService from '~/service/OrderService'

enum PromotionType {
    PERCENT = "PERCENT",
    DIRECT = "DIRECT"
}
enum PaymentType {
    VNPAY = "VNPAY",
    CASH = "CASH"
}
enum Status {
    RECEIVED = "Đã nhận yêu cầu",
    IN_DELIVERY = "Đang giao hàng",
    DELIVERED = "Giao thành công"
}
interface Order {
    name: string
    phone: string
    address: string
    valueVoucher: number | null
    promotionType: string | null
    time_Create: string
    isPaid: boolean
    paymentType: PaymentType
    status: Status
    orderDetails: Array<OrderDetail>
}
interface OrderDetail {
    productId: string
    productName: string
    price: number
    quantity: number
    img: string
}
function HistoryOrder() {
    const idUser = useSelector((state: RootState) => state.auth.id) || ""
    const [order, SetOrder] = useState<Order[]>([])
    useEffect(() => {
        OrderService.getOrderById(idUser).then((res) => {
            SetOrder(res.data.result.items)
        })
    }, [])
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
            sum -= Order.valueVoucher || 0
        } else if (Order.promotionType == PromotionType.PERCENT) {
            sum -= sum * (1 - Order.valueVoucher / 100)
        }
        return sum
    }
    const renderListOrder = () => {
        return order.map((index) => {
            const total = calculateTotal(index)
            return (
                <div className='flex flex-col border border-blue-300 rounded-md p-1'>
                    <div className='bg-gray-400 grid grid-cols-5 text-center rounded-t-md'>
                        <div>
                            <span className='opacity-70'>Thời gian đặt hàng</span>
                            <br />
                            <span>{formatDate(index.time_Create)}</span>
                        </div>
                        <div>
                            <span className='opacity-70'>Số điện thoại</span>
                            <br />
                            <span>{index.phone}</span>
                        </div>
                        <div>
                            <span className='opacity-70'>Địa chỉ</span>
                            <br />
                            <span>{index.address}</span>
                        </div>
                        <div>
                            <span className='opacity-70'>Giá trị Voucher</span>
                            <br />
                            <span>{index.promotionType == PromotionType.DIRECT ?
                                index.valueVoucher?.toLocaleString() :
                                (total * (index.valueVoucher as number / 100)).toLocaleString()}</span>
                        </div>
                        <div>
                            <span className='opacity-70'>Tổng giá trị</span>
                            <br />
                            <span>{total.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className='bg-gray-400 p-2'>
                        <Tag color='blue'>{index.status.valueOf()}</Tag>
                        <Tag color='blue'>{index.isPaid ? "Đã Thanh toán" : "Chưa Thanh toán"}</Tag>
                        <Tag color='blue'>{index.paymentType == PaymentType.VNPAY ? "VNPAY" : "Tiền mặt"}</Tag>
                    </div>
                    <div>
                        <HistoryOrderItem order={index.orderDetails} />
                    </div>
                </div>
            )
        })
    }
    return (
        <div className='p-1 flex flex-col space-y-3'>
            {renderListOrder()}
        </div>
    )
}

export default HistoryOrder