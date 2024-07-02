import { text } from '@fortawesome/fontawesome-svg-core'
import { Table, TableProps, Tag, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Order, OrderDetail, PromotionType, Status } from '~/config/Types'
import OrderService from '~/service/OrderService'
import Util from '~/util/Util'

function DetailOrder() {
    const id = useLocation().pathname.split("/").pop()
    const [order, SetOrder] = useState<Order>()
    const [orderDetail, SetOrderDetail] = useState<OrderDetail[]>()
    const navigate = useNavigate()
    useEffect(() => {
        OrderService.getById(id as string).then((res) => {
            SetOrderDetail(res.data.result.orderDetails)
            SetOrder(res.data.result)
        })
    }, [])
    const columns: TableProps<OrderDetail>['columns'] = [
        {
            title: "Tên sản phẩm",
            dataIndex: "productName",
            key: "productName",
            render: (text) => <span>{text}</span>
        },
        {
            title: "Hình ảnh",
            dataIndex: "img",
            key: "img",
            render: (text) => <img className='w-40' src={text} />
        },
        {
            title: "Trạng thái",
            dataIndex: "price",
            key: "price",
            render: (value: number) => <span>{value.toLocaleString()}</span>
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (text: number) => <span>{text.toLocaleString()}</span>
        },
        {
            title: "Tổng",
            key: "total",
            render: (value, record, index) => {
                return <span>{(record.price * record.quantity).toLocaleString()}</span>
            }
        }

    ]
    const onClickChangeStatus = () => {
        OrderService.changeStatus(id as string).then((res) => {
            message.success("Đổi trạng thái thành công")
            setTimeout(() => {
                navigate(-1)
            }, 500)

        })
    }
    return (
        order && <div className='space-y-2'>
            <div className='flex space-x-2 p-2'>
                <span>Thời gian đặt hàng: <Tag color='green'>{Util.formatDate(order.time_Create)}</Tag></span>
                {
                    order.promotionType && <span>Loại voucher: <Tag color='blue'>{order.promotionType}</Tag></span>
                }
                {
                    order.promotionType && <span>Giá trị Voucher: <Tag color='gold'>{order.promotionType === PromotionType.DIRECT ? order.valueVoucher?.toLocaleString() : `${order.valueVoucher}%`}</Tag></span>
                }
                <span>Trạng thái: <Tag color='red'>{order.status}</Tag></span>
                <span>Tổng giá trị đơn hàng: <Tag color='red'>{order.total.toLocaleString()}</Tag></span>
                {
                    order.status !== Status.DELIVERED && <button onClick={() => onClickChangeStatus()} className='bg-blue-600 border rounded-md p-2 text-white'>Đổi trạng thái đơn hàng</button>
                }
            </div>
            <Table columns={columns} dataSource={orderDetail} pagination={false}></Table>
        </div>
    )
}

export default DetailOrder