import { Checkbox, Pagination, Select, Slider, Spin, message } from 'antd'
import type { CheckboxOptionType, GetProp } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { typeCategory, typeProduct } from '~/config/Types';
import ProductService from '~/service/ProductService';
import type { InputNumberProps } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import CategoryService from '~/service/CategoryService';
function ProductList() {
    const [currentPage, SetCurrentPage] = useState<number>(1)
    const [totalPage, SetTotalPage] = useState<number>()
    const [products, SetProducts] = useState<Array<typeProduct>>([])
    const [category, SetCategory] = useState<CheckboxOptionType[]>([])
    const [loading, SetLoading] = useState<boolean>(true)
    const [price, SetPrice] = useState<number>(2000000)
    const [option, SetOption] = useState("price:desc")
    const [search, SetSearch] = useState<string>("")
    const [searchCategory, SetSearchCategory] = useState<CheckboxValueType[]>([])
    const [searchParams, SetSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const onChangeValue: InputNumberProps['onChange'] = (value) => {
        if (isNaN(value as number)) {
            return;
        }
        SetPrice(value as number)
    }
    const onChange = (checkedValues: CheckboxValueType[]) => {
        SetSearchCategory(checkedValues.slice(-1))
    };
    const renderListProducts = () => {
        return (
            products.map((index, key) => {
                return (
                    <div className='flex flex-col rounded-lg border text-xl cursor-pointer p-2 bg-green-300' key={key} onClick={() => { navigate(`/product/${index.id}`) }}>
                        <img src={index.img} className='w-auto rounded-md hover:scale-95 duration-150' />
                        <span className='px-2'>{index.name}</span>
                        <span className='px-2'>{index.price.toLocaleString()}</span>
                    </div>
                )
            })
        )
    };
    const onChangePage = (page: number) => {
        searchParams.set("pageNo", page.toString())
        SetSearchParams(searchParams)
        SetCurrentPage(page)
        SetLoading(true)
    }
    const onClickSearch = () => {
        const updatedParams = new URLSearchParams();
        updatedParams.set("search", `name=${search},price=${price}`);
        if (searchCategory) updatedParams.set("category", `${searchCategory}`);
        if (option) updatedParams.set("sortBy", option);
        SetSearchParams(updatedParams);
        SetLoading(true);
    }
    useEffect(() => {
        const CallApi = async () => {
            try {
                const [productRes, categoryRes] = await Promise.all([
                    ProductService.getList(searchParams),
                    CategoryService.getList()
                ]);
                SetProducts(productRes.data.result.items);
                SetTotalPage(productRes.data.result.totalItem);
                const transform = categoryRes.data.result.map((index: typeCategory) => ({
                    value: index.name,
                    label: index.name
                }));
                SetCategory(transform);
            } catch (err) {
                message.error("Lỗi Server")
            } finally {
                SetLoading(false)
            }
        }
        CallApi()
    }, [searchParams])

    return (
        <div className='grid grid-cols-4 p-8'>
            <div className='col-span-1'>
                <div className='flex flex-col mx-8'>
                    <input onChange={(e) => { SetSearch(e.target.value) }} className='rounded-lg border p-2 w-9/12' placeholder='Tên sản phẩm'></input>
                    <span className='py-2'>Danh mục</span>
                    <Checkbox.Group options={category} onChange={onChange} value={searchCategory} className='py-1 flex flex-col'></Checkbox.Group>
                    <span className='py-2'>Khoảng giá</span>
                    <div className='flex'>
                        <Slider min={10000} max={2000000} defaultValue={2000000} onChange={onChangeValue} step={20000} className='w-6/12' />
                    </div>
                    <span className='py-2'>Sắp Xếp theo</span>
                    <Select className='w-5/12 my-2'
                        defaultValue={"price:desc"}
                        options={[
                            { value: "price:desc", label: 'Giá giảm dần' },
                            { value: "price:asc", label: 'Giá tăng dần' }
                        ]}
                        onChange={(value) => SetOption(value)}
                    />
                    <button onClick={() => { onClickSearch() }} className='rounded-md h-10 w-7/12 text-center border-2 hover:bg-green-400 duration-200 hover:text-white'>
                        Tìm Kiếm
                    </button>
                </div>
            </div>
            <div className='col-span-3'>
                <div className='grid grid-cols-4 gap-4 grid-rows-2'>
                    {!loading ? (renderListProducts()) : (null)}
                </div>
            </div>
            <div className='col-span-4 flex flex-row-reverse my-6'>
                {!loading ? (<Pagination defaultCurrent={currentPage} current={currentPage} pageSize={8} total={totalPage} onChange={onChangePage} />) : null}
            </div>
        </div>
    )
}

export default ProductList