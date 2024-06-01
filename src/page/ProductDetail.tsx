import { faMinus, faPhone, faPlus, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { message, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { typeProduct } from '~/config/Types'
import { RootState } from '~/redux/store'
import CartService from '~/service/CartService'
import ProductService from '~/service/ProductService'
type NotificationType = 'success' | 'info' | 'warning' | 'error';
function ProductDetail() {
    const idUser = useSelector((state: RootState) => state.auth.id) || ""
    const [quantity, SetQuantity] = useState<number>(1)
    const [product, SetProduct] = useState<typeProduct>()
    const location = useLocation()
    const id = location.pathname.split("/").pop() || ""
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: "Thêm vào giỏ hàng thành công",
        });
    };

    const increase = () => {
        SetQuantity(quantity + 1)
    }
    const decrease = () => {
        (quantity - 1 <= 0) ? (message.error("Không thể giảm số lượng")) : (SetQuantity(quantity - 1))
    }
    useEffect(() => {
        const CallApi = async () => {
            ProductService.getById(id).then((res) => {
                SetProduct(res.data.result)
            })
        }
        CallApi()
    }, [])
    const addToCart = () => {
        CartService.changeQuantity(idUser, id, "INCREASE", quantity).then(() => {
            openNotificationWithIcon("success")
        })
    }
    return (
        <div className='flex justify-center p-4'>
            {contextHolder}
            <div className='w-8/12 grid grid-cols-2 gap-8'>
                <div>
                    <img src={product?.img} />
                </div>
                <div className='flex flex-col'>
                    <span className='text-2xl font-semibold'>{product?.name}</span>
                    <span className='text-xl font-semibold text-red-600'>{product?.price.toLocaleString()} VND</span>
                    <span>
                        {product?.description}
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
                    <button onClick={() => addToCart()} className='flex mt-4 bg-green-600 w-fit p-3 rounded-lg text-white'>
                        Thêm vào giỏ hàng ngay
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail