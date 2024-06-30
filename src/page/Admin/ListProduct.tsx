import { Pagination, TabPaneProps, Table, TableProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ProductProps } from '~/config/Types'
import CategoryService from '~/service/CategoryService'
import ProductService from '~/service/ProductService'


interface formSearchProducts {
    name: string,
    category: string,
}
interface category {
    name: string
}
function ListProduct() {
    const [products, SetProducts] = useState<ProductProps[]>([])
    const [category, SetCategory] = useState<category[]>([])
    const [searchParams, SetSearchParams] = useSearchParams()
    const [currentPage, SetCurrentPage] = useState<number>(1)
    const [totalPage, SetTotalPage] = useState<number>()
    const navigate = useNavigate()
    const columns: TableProps<ProductProps>['columns'] = [
        {
            title: "Mã sản phẩm",
            dataIndex: "id",
            key: "id",
            render: (text) => <span>{text}</span>
        },
        {
            title: "Tên sản phẩm",
            dataIndex: 'name',
            key: "name",
            render: (text) => <span>{text}</span>
        },
        {
            title: "Hình ảnh",
            dataIndex: 'img',
            key: "img",
            render: (img) => <img className='w-20' src={img} />
        },
        {
            title: "Giá",
            dataIndex: 'price',
            key: "Giá",
            render: (price: number) => <span>{price.toLocaleString()}</span>
        },
        {
            title: "Thao tác",
            key: 'action',
            render: (value, record, index) => {
                return <button onClick={() => navigate(`${record.id}`)} className='bg-blue-600 text-white p-2 rounded-md'>Xem chi tiết</button>
            },
        }
    ]
    const { register, handleSubmit } = useForm<formSearchProducts>()

    const onChangePage = (page: number) => {
        searchParams.set("pageNo", page.toString())
        SetSearchParams(searchParams)
        SetCurrentPage(page)
    }
    const onClickSearch = (value: formSearchProducts) => {
        const updatedParams = new URLSearchParams();
        value.name.length > 0 && updatedParams.set("search", `name=${value.name}`);
        value.category !== "All" && updatedParams.set("category", `${value.category}`);
        SetCurrentPage(1)
        SetSearchParams(updatedParams);
    }
    useEffect(() => {
        ProductService.getList(searchParams).then((res) => {
            SetProducts(res.data.result.items)
            SetTotalPage(res.data.result.totalItem)
        })
    }, [searchParams])
    useEffect(() => {
        CategoryService.getList().then((res) => {
            SetCategory(res.data.result.items)
        })
    }, [])
    const renderOptionCategory = () => {
        return category.map((index) => {
            return (
                <option value={index.name}>{index.name}</option>
            )
        })
    }
    return (
        <div className=''>
            <div>
                <form onSubmit={handleSubmit(onClickSearch)} className='flex space-x-4'>
                    <div className=''>
                        <label>Tên sản phẩm: </label>
                        <input {...register("name")} type='text' className='border-b-2 outline-none'></input>
                    </div>
                    <div>
                        <label>Phân loại: </label>
                        <select {...register("category")}>
                            {renderOptionCategory()}
                            <option value={"All"}>Tất cả</option>
                        </select>
                    </div>
                    <button className='bg-blue-500 text-white rounded-lg px-4'>Tìm kiếm</button>
                </form>
                {products && <Table className='mt-4' columns={columns} dataSource={products} pagination={false} />}
            </div>
            <div className=''>
                {
                    products && <Pagination defaultCurrent={currentPage} current={currentPage} pageSize={8} total={totalPage} onChange={onChangePage} />
                }
            </div>
        </div>
    )
}

export default ListProduct