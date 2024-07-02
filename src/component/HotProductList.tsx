import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import Util from '~/util/Util';
import { ProductProps } from '~/config/Types';
import ProductService from '~/service/ProductService';
import Product from './Product';
function HotProductList() {
    const [products, SetProducts] = useState<ProductProps[]>([])
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        arrows: false
    };
    useEffect(() => {
        const params = new URLSearchParams()
        params.set("search", `isHot=true`)
        ProductService.getList(params).then((res) => {
            SetProducts(res.data.result.items)
        })
    }, [])
    const render = () => {
        return products.map((index) => {
            return (
                <Product product={index} type='HOT' />
            )
        })
    }
    return (
        <div className='bg-slate-200 w-1/2 rounded-md p-2'>
            <span className='text-2xl font-semibold'>Sản phẩm nổi bật</span>
            {
                products.length >= 3 ?
                    <Slider {...settings}>
                        {render()}
                    </Slider> : <div>
                        <span>Vui lòng thêm đủ 3 sản phẩm hot để hiện thị</span>
                    </div>
            }

        </div>
    )
}

export default HotProductList