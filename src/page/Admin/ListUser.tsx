import { Button, Pagination, Table, TableProps, Tag, message } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { user } from '~/config/Types'
import UserService from '~/service/UserService'
import Util from '~/util/Util'

function ListUser() {
    const [users, SetUsers] = useState<user[]>([])
    const [currentPage, SetCurrentPage] = useState(1)
    const [totalPage, SetTotalPage] = useState()
    const [searchParam, SetSearchParam] = useSearchParams()
    const { register, handleSubmit } = useForm<user>()
    const pageSize = useMemo(() => {
        return 8
    }, [])
    const columns: TableProps<user>['columns'] = [
        {
            title: "Tên đăng nhập",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: 'email',
            key: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "Ngày sinh",
            dataIndex: 'dob',
            key: "dob"
        },
        {
            title: "Quyền",
            dataIndex: 'role',
            key: "role"
        },
        {
            title: "Loại Xác thực",
            dataIndex: "userProvide",
            key: "userProvide",
            render: (value, record, index) => {
                if (record.userProvide === 'LOCAL')
                    return <Tag color='blue'>{value}</Tag>
                return <Tag color='green'>{value}</Tag>
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "isBan",
            key: "isBan",
            render: (value: boolean) => {
                if (value) {
                    return <Tag color='red'>Bị cấm</Tag>
                }
                return <Tag color='green'>Hoạt động</Tag>
            }
        },
        {
            title: "Hành động",
            key: "action",
            render: (value, record) => {
                return <button onClick={() => onChangeStatus(record.email)} className='border p-1 rounded-md hover:bg-blue-600 hover:text-white transition-all'>Đổi trạng thái</button>
            }
        }
    ]
    const onChangeStatus = (email: string) => {
        UserService.changeStatus(email).then((res) => {
            message.success("Đổi trạng thái thành công")
            SetUsers((pre) => {
                const index = pre.findIndex((value) => value.email === email)
                if (index != -1) {
                    const newListUser = [...pre]
                    newListUser[index] = { ...newListUser[index], isBan: !newListUser[index].isBan }
                    return newListUser
                }
                return pre
            })
        }).catch((err) => {
            message.error("Lỗi Server")
        })
    }
    const onChangePage = (value: number) => {
        searchParam.set("page", (value - 1).toString())
        SetSearchParam(searchParam)
        SetCurrentPage(value)
    }
    const onSearch = (value: user) => {
        const param = new URLSearchParams
        param.set("user", `email~${value.email}`)
        param.append("user", `,phone~${value.phone}`)
        SetSearchParam(param)
    }
    useEffect(() => {
        searchParam.set("size", pageSize.toString())
        UserService.getList(searchParam).then((res) => {
            SetUsers(res.data.result.items)
            SetCurrentPage(Util.ConvertNumberPage(res.data.result.pageNo))
            SetTotalPage(res.data.result.totalItem)
        })
    }, [searchParam, currentPage, pageSize])
    return (
        <div className=''>
            <div className='space-y-2'>
                <form onSubmit={handleSubmit(onSearch)} className='space-x-4'>
                    <label>Email: </label>
                    <input {...register("email")} className='outline-none border-b-2' type='text'></input>
                    <label>Số điện thoại: </label>
                    <input {...register("phone")} className='outline-none border-b-2' type='text'></input>
                    <button className='bg-blue-500 text-white rounded-lg px-4'>Tìm kiếm</button>
                </form>
                <Table columns={columns} dataSource={users} pagination={false}></Table>
                <div className='flex justify-end mt-2'>
                    <Pagination defaultCurrent={currentPage} pageSize={pageSize} current={currentPage} total={totalPage} showSizeChanger={false} onChange={onChangePage}></Pagination>
                </div>
            </div>
        </div>
    )
}

export default ListUser