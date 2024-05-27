import { Skeleton, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { typeProduct } from '~/config/Types'
import ProductService from '~/service/ProductService'

function SearchBlock({ search }: { search: string }) {
    const [isLoadingSearch, SetIsloadingSearch] = useState(true)
    const [product, SetProduct] = useState<typeProduct[]>([])
    useEffect(() => {
        const callApi = async () => {
            ProductService.getList(`search=name:${search}`).then((res) => {
                SetProduct(res.data.result.items)
            }).catch(() => {
                message.error("Lỗi Server")
            }).finally(() => {
                SetIsloadingSearch(false)
            })
        }
        callApi()
    }, [search])
    return (
        !isLoadingSearch ? (
            <div className='absolute border flex flex-col overflow-y-scroll no-scrollbar border-red-600 -right-1 top-12 z-50 h-60 w-9/12 bg-white rounded-lg'>
                {
                    product.map((index) => {
                        return (
                            <div className='rounded-md flex p-2 border m-2 hover:bg-green-200 duration-200'>
                                <img className='w-2/12' src={index.img} />
                                <div className='flex flex-col px-2'>
                                    <span className='font-medium'>{index.name}</span>
                                    <span>{index.price}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        ) :
            (
                <div className='absolute border flex flex-col overflow-y-scroll no-scrollbar border-red-600 -right-1 top-12 z-50 h-70 w-9/12 bg-white rounded-lg'>

                    <div className='rounded-md flex p-2 border m-2'>
                        <Skeleton.Image active={true} className='w-2/12' />
                        <div className='flex flex-col px-2'>
                            <Skeleton.Input active={true} className='pb-2' size='small' />
                            <Skeleton.Input active={true} size='small' />
                        </div>
                    </div>
                    <div className='rounded-md flex p-2 border m-2'>
                        <Skeleton.Image active={true} className='w-2/12' />
                        <div className='flex flex-col px-2'>
                            <Skeleton.Input active={true} className='pb-2' size='small' />
                            <Skeleton.Input active={true} size='small' />
                        </div>
                    </div>

                </div>
            )
    )
}

export default SearchBlock