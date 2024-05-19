import { faMinus, faPhone, faPlus, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { message } from 'antd'
import React, { useState } from 'react'

function ProductDetail() {
    const [quantity, SetQuantity] = useState<number>(1)
    const increase = () => {
        SetQuantity(quantity + 1)
    }
    const decrease = () => {
        (quantity - 1 <= 0) ? (message.error("Không thể giảm số lượng")) : (SetQuantity(quantity - 1))
    }
    return (
        <div className='flex justify-center p-4'>
            <div className='w-8/12 grid grid-cols-2 gap-8'>
                <div>
                    <img src="https://lacdau.com/media/product/1763-a3779c9c2559b07bb05c92503de05c63.png" />
                </div>
                <div className='flex flex-col'>
                    <span className='text-2xl font-semibold'>Goku</span>
                    <span className='text-xl font-semibold text-red-600'>1.000.000</span>
                    <span>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </span>
                    <div className='flex mt-16 font-medium'>
                        <FontAwesomeIcon icon={faTruck} size='2x' opacity={"0.8"} color='green' />
                        <span className='px-2'>Giao hàng tận nơi miễn phí Ship</span>
                    </div>
                    <div className='flex mt-4 font-medium'>
                        <FontAwesomeIcon icon={faPhone} size='2x' opacity={"0.8"} color='green' />
                        <span className='px-4'>Liên hệ 24/7</span>
                    </div>
                    <div className='items-center flex w-4/12 h-14 mt-4 border rounded-2xl border-gray-950 text-center'>
                        <button onClick={() => { decrease() }} className='w-1/3'>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className='w-1/3'>{quantity}</span>
                        <button onClick={() => { increase() }} className='w-1/3'>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    <button className='flex mt-4 bg-green-600 w-fit p-3 rounded-lg text-white'>
                        Thêm vào giỏ hàng ngay
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail