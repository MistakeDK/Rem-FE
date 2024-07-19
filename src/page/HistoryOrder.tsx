import { Button, Result, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HistoryOrderItem from '~/component/HistoryOrderItem'
import { RootState } from '~/redux/store'
import OrderService from '~/service/OrderService'
import PaymentService from '~/service/PaymentService'
import Util from "~/util/Util"
import { Order, paymentType, PromotionType } from "~/config/Types"
function HistoryOrder() {
    const idUser = useSelector((state: RootState) => state.auth.id) || ""
    const [page, SetPage] = useState(1)
    const [totalPage, SetTotalPage] = useState<number>(0)
    const [order, SetOrder] = useState<Order[]>([])
    useEffect(() => {
        const param = new URLSearchParams()
        param.set("pageNo", page.toString())
        OrderService.getOrderById(idUser, param).then((res) => {
            if (page !== 1) {
                SetOrder((pre) => [...pre, ...res.data.result.items])
            } else {
                SetOrder(res.data.result.items)
            }
            SetTotalPage(res.data.result.totalPage)
        })
    }, [page, idUser])
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight && page < totalPage) {
                SetPage((prevPage) => prevPage + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page, totalPage]);

    const payment = (total: number, id: string) => {
        PaymentService.paymentVNPay(total, id).then((res) => {
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
            return (
                <div className='flex flex-col rounded-md'>
                    <div className='bg-gray-400 grid grid-cols-5 text-center rounded-t-md'>
                        <div>
                            <span className='opacity-70'>Thời gian đặt hàng</span>
                            <br />
                            <span>{Util.formatDate(index.time_Create)}</span>
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
                            <span>{Util.valueVoucher(index.promotionType || null, index.valueVoucher as number)}</span>
                        </div>
                        <div>
                            <span className='opacity-70'>Tổng giá trị</span>
                            <br />
                            <span>{index.total.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className='bg-gray-400 p-2'>
                        <Tag color='blue'>{Util.convertStatusOrderToText(index.status)}</Tag>
                        <Tag color='blue'>{index.isPaid ? "Đã Thanh toán" : "Chưa Thanh toán"}</Tag>
                        <Tag color='blue'>{index.paymentType == paymentType.VNPAY ? "VNPAY" : "Tiền mặt"}</Tag>
                        {index.paymentType == paymentType.VNPAY && !index.isPaid &&
                            <button onClick={() => payment(index.total, index.id)} className='p-1 bg-orange-400 rounded-md' color='green'>Thanh Toán ngay</button>
                        }
                    </div>
                    <div>
                        <HistoryOrderItem order={index.orderDetails} idOrder={index.id} isPaid={index.isPaid} />
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