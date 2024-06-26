import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import Util from '~/util/Util';
import { ProductProps } from '~/config/Types';
import ProductService from '~/service/ProductService';
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
                <div className='flex flex-col p-1' key={index.id + "HOT"}>
                    <img className='hover:scale-90 transition-all' src={index.img} />
                    <span>{Util.subText(index.name, 18)}</span>
                    <br />
                    <span>{index.price.toLocaleString()}</span>
                </div>
            )
        })
    }
    return (
        <div className='bg-slate-200 w-1/2 rounded-md p-2'>
            <span className='text-2xl font-semibold'>Sản phẩm nổi bật</span>
            <Slider {...settings}>
                {render()}
            </Slider>
        </div>
    )
}

export default HotProductList