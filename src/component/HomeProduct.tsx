import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { category, ProductProps } from '~/config/Types'
import CategoryService from '~/service/CategoryService'
import ProductService from '~/service/ProductService'
import Util from '~/util/Util'
function HomeProduct() {
    const [category, SetCategory] = useState<category[]>([])
    const [product, SetProduct] = useState<ProductProps[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        const params = new URLSearchParams()
        const pageSize = 15
        params.set("pageSize", pageSize.toString())
        const fetchData = async () => {
            try {
                const [categoryResult, productResult] = await Promise.all([
                    CategoryService.getList(),
                    ProductService.getList(params)
                ]);
                SetCategory(categoryResult.data.result);
                SetProduct(productResult.data.result.items);
            } catch {
                message.error("lỗi Server")
            }
        }
        fetchData()
    }, [])
    const onClickCategory = (category: string) => {
        const params = new URLSearchParams()
        params.set("category", category)
        navigate(`/product?${params}`)
    }
    const renderCate = () => {
        return category.map((index) => {
            return (
                <button onClick={() => onClickCategory(index.name)} className='hover:text-white hover:bg-orange-600 transition-all p-1.5 border border-orange-600 rounded-md' key={index.id}>{index.name}</button>
            )
        })
    }
    const renderProduct = () => {
        return (
            product.map((index) => {
                return (
                    <div key={index.id} className='p-4 cursor-pointer' onClick={() => navigate(`/product/${index.id}`)}>
                        <img className='hover:scale-90 transition-all ' src={index.img} />
                        <span className='text-xl '>{Util.subText(index.name, 19)}</span>
                        <br />
                        <span className='text-lg'>{index.price.toLocaleString()}</span>
                    </div>
                )
            })
        )
    }

    return (
        <div className='flex justify-center bg-slate-200 p-4 rounded-md'>
            <div className='flex flex-col w-full'>
                <div className='flex justify-between'>
                    <span className='px-4 text-2xl'>IN STOCK</span>
                    <div className='space-x-4'>
                        {category && renderCate()}
                    </div>
                </div>
                <div className='grid grid-cols-5'>
                    {renderProduct()}
                </div>
            </div>
        </div>
    )
}

export default HomeProduct