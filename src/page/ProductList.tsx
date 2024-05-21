import { Checkbox, Pagination, Slider, Spin, message } from 'antd'
import type { CheckboxOptionType, GetProp } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { typeCategory, typeProduct } from '~/config/Types';
import ProductService from '~/service/ProductService';
import type { InputNumberProps } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import CategoryService from '~/service/CategoryService';
function ProductList() {
    const [page, SetPage] = useState<number>(1)
    const [products, SetProducts] = useState<Array<typeProduct>>([])
    const [category, SetCategory] = useState<CheckboxOptionType[]>([])
    const [loading, SetLoading] = useState<boolean>(true)
    const [price, SetPrice] = useState<number>(2000000)
    const [search, SetSearch] = useState<string>()
    const [searchCategory, SetSearchCategory] = useState<CheckboxValueType[]>([])
    const navigate = useNavigate()
    const onChangeValue: InputNumberProps['onChange'] = (value) => {
        if (isNaN(value as number)) {
            return;
        }
        SetPrice(value as number)
    }
    const onChange = (checkedValues: CheckboxValueType[]) => {
        SetSearchCategory(checkedValues)
    };
    const renderListProducts = () => {
        return (
            products.map((index, key) => {
                return (
                    <div className='flex flex-col rounded-lg border text-xl cursor-pointer p-2 bg-green-300' key={key} onClick={() => { navigate(`/product/${index.id}`) }}>
                        <img src={index.img} className='w-auto rounded-md hover:scale-95 duration-150' />
                        <span className='px-2 '>{index.name}</span>
                        <span className='px-2'>{index.price.toLocaleString()}</span>
                    </div>
                )
            })
        )
    }
    useEffect(() => {
        const CallApi = async () => {
            try {
                const productRes = await ProductService.getList();
                SetProducts(productRes.data.result);
                const categoryRes = await CategoryService.getList();
                const transform = categoryRes.data.result.map((index: typeCategory) => {
                    return ({
                        value: index.id,
                        label: index.name
                    })
                })
                SetCategory(transform)
            } catch (err) {
                message.error("Lỗi Server")
            } finally {
                SetLoading(!loading)
            }
        }
        CallApi()
    }, [])

    return (
        <div className='grid grid-cols-4 p-8'>
            <div className='col-span-1'>
                <div className='flex flex-col'>
                    <input onChange={(e) => { SetSearch(e.target.value) }} className='rounded-lg border p-2 w-7/12' placeholder='Tên sản phẩm'></input>
                    <span className='py-2'>Danh mục</span>
                    <Checkbox.Group options={category} onChange={onChange} className='py-2 flex flex-col'></Checkbox.Group>
                    <span className='py-2'>Khoảng giá</span>
                    <div className='flex'>
                        <Slider min={10000} max={2000000} defaultValue={2000000} onChange={onChangeValue} step={20000} className='w-6/12' />
                    </div>
                    <button onClick={() => { console.log(search, price, searchCategory) }} className='rounded-md h-10 w-7/12 text-center border-2 hover:bg-green-400 duration-200 hover:text-white'>
                        Tìm Kiếm
                    </button>
                </div>
            </div>
            <div className='col-span-3'>
                <div className='grid grid-cols-4 gap-4'>
                    {!loading ? (renderListProducts()) : (null)}
                </div>
            </div>
            <div className='col-span-4 flex flex-row-reverse my-6'>
                <Pagination defaultCurrent={page} pageSize={20} total={50} />
            </div>
        </div>
    )
}

export default ProductList