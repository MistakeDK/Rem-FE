import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import Util from '~/util/Util';
import { ProductProps } from '~/config/Types'
import ProductService from '~/service/ProductService';
import Product from './Product';
function NewProductList() {
    const [products, SetProducts] = useState<ProductProps[]>([])
    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        arrows: false
    };
    const render = () => {
        return products.map((index) => {
            return (
                <Product product={index} type='NEW' />
            )
        })
    }
    useEffect(() => {
        const params = new URLSearchParams()
        params.set("search", `isNew=true`)
        ProductService.getList(params).then((res) => {
            SetProducts(res.data.result.items)
        })
    }, [])
    return (
        <div className='bg-slate-200 w-1/2 rounded-md p-2'>
            <span className='text-2xl font-semibold'>Sản phẩm mới</span>
            {
                products.length >= 3 ? <Slider {...settings}>
                    {render()}
                </Slider> : <span>Vui lòng thêm đủ 3 sản phẩm Hot để hiện thị</span>
            }

        </div>
    )
}

export default NewProductList