import { Modal, Pagination, Table, TableProps, message } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { category } from '~/config/Types'
import CategoryService from '~/service/CategoryService'
import Util from '~/util/Util'

function ListCategory() {
    const [category, SetCategory] = useState<category[]>([])
    const [isOpen, SetIsOpen] = useState(false)
    const [searchParams, SetSearchParams] = useSearchParams()
    const [currentPage, SetCurrentPage] = useState<number>(0)
    const [totalPage, SetTotalPage] = useState<number>()
    const [searchName, SetSearchName] = useState<string>("")
    const { register, handleSubmit, setError, formState: { errors } } = useForm<category>()

    const pageSize = useMemo(() => {
        return 4
    }, [])
    const columns: TableProps<category>['columns'] = [
        {
            title: "Mã Danh mục",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên danh mục",
            dataIndex: 'name',
            key: "name",

        }
    ]
    useEffect(() => {
        searchParams.set("size", pageSize.toString())
        CategoryService.getList(searchParams).then((res) => {
            SetCategory(res.data.result.items)
            SetCurrentPage(Util.ConvertNumberPage(res.data.result.pageNo))
            SetTotalPage(res.data.result.totalItem)
        })
    }, [searchParams])
    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        SetSearchName(e.target.value)
    }, [])
    const onSearch = useCallback(() => {
        const params = new URLSearchParams()
        params.set("page", "0")
        params.set("size", pageSize.toString())
        params.set("name", searchName)
        SetSearchParams(params)
    }, [searchName])
    const changePage = (value: number) => {
        const updateParam = searchParams
        updateParam.set("page", (value - 1).toString())
        SetCurrentPage(value)
        SetSearchParams(updateParam)
    }
    const openModal = useCallback(() => {
        SetIsOpen(true)
    }, [])
    const closeModal = useCallback(() => {
        SetIsOpen(false)
    }, [])

    const onSubmit = (value: category) => {
        CategoryService.create(value.name).then((res) => {
            message.success("Thêm danh mục mới thành công")
        }).catch((err) => {
            setError("name", {
                message: Util.SetErrorField(err)
            })
            message.error("Thêm thất bại")
        })
    }
    const createModal = () => {
        return (
            <Modal open={isOpen} footer={false} onCancel={closeModal} >
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col m-20'>
                    <label>Tên danh mục: </label>
                    <input {...register("name", {
                        required: "Tên là dữ liệu bắt buộc"
                    })} className='outline-none border p-1 rounded-md'></input>
                    {errors.name ? <span className='h-6 text-red-600'>{errors.name.message}</span> : <span className='h-6'></span>}
                    <button className='bg-blue-600 p-2 rounded-md text-white'>Xác nhận</button>
                </form>
            </Modal>
        )
    }
    return (
        <div>
            <div className='space-y-2'>
                <div className='flex space-x-4'>
                    <label>Tên Danh mục:</label>
                    <input className='outline-none border-b-2' value={searchName} onChange={handleNameChange}></input>
                    <button className='p-1 text-white bg-blue-600 rounded-md' onClick={onSearch}>TÌm kiếm</button>
                    <button className='p-1 text-white bg-blue-600 rounded-md' onClick={openModal}>Thêm danh mục</button>
                </div>
                <Table columns={columns} dataSource={category} pagination={false}></Table>
                {createModal()}
            </div>
            <div className='flex justify-end mt-2'>
                <Pagination defaultCurrent={currentPage} current={currentPage} pageSize={pageSize} total={totalPage} onChange={changePage} showSizeChanger={false} />
            </div>
        </div>
    )
}

export default ListCategory