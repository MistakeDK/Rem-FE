import { text } from '@fortawesome/fontawesome-svg-core'
import { Pagination, Table, TableProps, Tag } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Order, Status, paymentType } from '~/config/Types'
import OrderService from '~/service/OrderService'
import Util from '~/util/Util'

type formSearchOrder = {
    name: string,
    phone: string,
    addres: string
}
function ListOrder() {
    const [orders, SetOrders] = useState<Order[]>([])
    const [searchParams, SetSearchParams] = useSearchParams()
    const [currentPage, SetCurrentPage] = useState<number>(1)
    const [totalPage, SetTotalPage] = useState<number>()
    const { register, handleSubmit } = useForm<formSearchOrder>()
    const pageSize = useMemo(() => {
        return 5
    }, [])
    const navigate = useNavigate()
    const columns: TableProps<Order>['columns'] = [
        {
            title: "Tên người nhận",
            dataIndex: "name",
            key: "name",
            render: (text) => <span>{text}</span>
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            render: (text) => <span>{text}</span>
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            render: (text) => <span>{text}</span>
        },
        {
            title: "Thanh toán",
            dataIndex: "isPaid",
            key: "isPaid",
            render: (text: boolean) => {
                if (text) {
                    return <Tag color='green'>Đã thanh toán</Tag>
                }
                return <Tag color='red'>Chưa thanh toán</Tag>
            }
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text: Status) => {
                if (text === Status.RECEIVED) {
                    return <Tag color='blue'>Đã Nhận yêu cầu</Tag>
                } else if (text === Status.IN_DELIVERY) {
                    return <Tag color='red'>Đang giao hàng</Tag>
                }
                return <Tag color='green'>Giao thành công</Tag>
            }
        },
        {
            title: "Loại thanh toán",
            dataIndex: "paymentType",
            key: "paymentType",
            render: (text: paymentType) => {
                if (text === paymentType.CASH) {
                    return <Tag color='green'>{text}</Tag>
                }
                return <Tag color="blue">{text}</Tag>
            }
        },
        {
            title: "Tổng giá trị",
            dataIndex: "total",
            key: "total",
            render: (text: number) => <span>{text.toLocaleString()}</span>
        },
        {
            title: "Hành động",
            key: "action",
            render: (value, record, index) => {
                return (
                    <button onClick={() => navigate(`${record.id}`)} className='border p-1 rounded-md hover:bg-blue-600 hover:text-white transition-all'>Xem chi tiết</button>
                )
            }
        }
    ]
    useEffect(() => {
        searchParams.set("size", pageSize.toString())
        searchParams.set("sort", "timeCreate,desc")
        OrderService.getList(searchParams).then((res) => {
            SetOrders(res.data.result.items)
            SetCurrentPage(Util.ConvertNumberPage(res.data.result.pageNo))
            SetTotalPage(res.data.result.totalItem)
        })
    }, [searchParams, pageSize, currentPage])
    const onChangePage = (pageNumber: number) => {
        searchParams.set("page", (pageNumber - 1).toString())
        SetSearchParams(searchParams)
        SetCurrentPage(pageNumber)
    }
    const onSearch = (value: formSearchOrder) => {
        searchParams.set("order", `name~${value.name},address~${value.addres},phone~${value.phone}`)
        SetSearchParams(searchParams)
    }
    return (
        <div>
            <div className='space-y-2'>
                <form onSubmit={handleSubmit(onSearch)} className='flex space-x-4' >
                    <label>Số điện thoại:</label>
                    <input {...register("phone")} type='text'></input>
                    <label>Địa chỉ:</label>
                    <input {...register("addres")} type='text'></input>
                    <label>Tên người nhận:</label>
                    <input {...register("name")} type='text'></input>
                    <button className='bg-blue-500 text-white rounded-lg px-4'>Tìm kiếm</button>
                </form>
                <Table columns={columns} dataSource={orders} pagination={false}></Table>
            </div>
            <div className='flex justify-end mt-2'>
                <Pagination defaultCurrent={currentPage} current={currentPage} pageSize={pageSize} onChange={onChangePage} total={totalPage} showSizeChanger={false} />
            </div>
        </div>
    )
}

export default ListOrder