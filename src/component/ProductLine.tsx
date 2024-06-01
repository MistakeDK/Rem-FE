import React, { useEffect, useState } from 'react'
import Product from './Product';
import ProductService from '~/service/ProductService';
import { ProductProps } from '~/config/Types';
import { message } from 'antd';
import Naruto_img from '~/resources/Naruto_img.jpg'
import Onepiece_img from '~/resources/Onepiece_img.jpg'
function ProductLine({ category }: { category: string }) {
    const [isLoading, SetIsLoading] = useState(true)
    const [product, SetProduct] = useState<ProductProps[]>()
    let img;
    const imgAdd = () => {
        if (category === "Naruto")
            img = Naruto_img
        else
            img = Onepiece_img
        return (
            <div className='col-span-2 row-span-2'>
                <img className='h-5/6 rounded-lg' src={img} />
            </div>
        )
    }
    const renderList = () => {
        const newList = product?.map((product) => {
            return (
                <Product product={product} ></Product>
            )
        })
        newList?.splice(3, 0, imgAdd())
        return newList
    }

    useEffect(() => {
        const callApi = async () => {
            ProductService.getList(`pageSize=6&category=${category}`).then((res) => {
                SetProduct(res.data.result.items)
            }).catch(() => {
                message.error("Lỗi Server")
            }).finally(() => {
                SetIsLoading(false)
            })
        }
        callApi()
    }, [])
    return (
        <main>
            <div className='text-center py-2'>
                <span className='text-3xl'>COLLECTION</span>
                <br />
                <span className='text-2xl'>{category}</span>

            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-5 w-10/12 gap-2'>
                    {!isLoading ? (renderList()) : (null)}
                </div>
            </div>
        </main>
    )
}

export default ProductLine