import { Button, Result, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HistoryOrderItem from '~/component/HistoryOrderItem'
import { RootState } from '~/redux/store'
import OrderService from '~/service/OrderService'
import PaymentService from '~/service/PaymentService'

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
    id: string
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
            sum -= Order.valueVoucher
        } else if (Order.promotionType == PromotionType.PERCENT) {
            sum -= sum * Order.valueVoucher / 100
        }
        return sum
    }
    const payment = (total: number, id: string) => {
        const urlParam = new URLSearchParams()
        urlParam.set("amount", total.toString())
        urlParam.set("bankCode", "NCB")
        PaymentService.paymentVNPay(urlParam, id).then((res) => {
            window.open(res.data.result)
        })
    }
    const orderNullScreen = () => {
        return (
            <Result
                status="info"
                title="Không có đơn hàng nào"

            />
        )
    }
    const renderListOrder = () => {
        return order.map((index) => {
            const total = calculateTotal(index)
            return (
                <div className='flex flex-col  rounded-md'>
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
                        {index.paymentType == PaymentType.VNPAY && !index.isPaid &&
                            <button onClick={() => payment(total, index.id)} className='p-1 bg-orange-400 rounded-md' color='green'>Thanh Toán ngay</button>
                        }
                    </div>
                    <div>
                        <HistoryOrderItem order={index.orderDetails} />
                    </div>
                </div>
            )
        })
    }
    return (
        <div className=' flex flex-col space-y-3'>
            {order.length !== 0 ? renderListOrder() : orderNullScreen()}
        </div>
    )
}

export default HistoryOrder