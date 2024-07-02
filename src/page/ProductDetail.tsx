import { faMinus, faPhone, faPlus, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Rate, message, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import CommentProduct from '~/component/CommentProduct'
import { typeProduct } from '~/config/Types'
import { RootState } from '~/redux/store'
import CartService from '~/service/CartService'
import ProductService from '~/service/ProductService'
type NotificationType = 'success' | 'info' | 'warning' | 'error';
function ProductDetail() {
    const idUser = useSelector((state: RootState) => state.auth.id)
    const [quantity, SetQuantity] = useState<number>(1)
    const [product, SetProduct] = useState<typeProduct>()
    const location = useLocation()
    const id = location.pathname.split("/").pop()
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message: message,
            description: description
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
            ProductService.getById(id as string).then((res) => {
                SetProduct(res.data.result)
            })
        }
        CallApi()
    }, [])
    const addToCart = () => {
        if (!idUser) {
            openNotificationWithIcon("error", "Thêm vào giỏ hàng thất bại", "Vui lòng đăng nhập")
            return
        }
        CartService.changeQuantity(idUser as string, id as string, "INCREASE", quantity).then(() => {
            openNotificationWithIcon("success", "Thêm thành công", "")
        }).catch(() => {
            message.error("Lỗi Server")
        })
    }
    return (
        product &&
        <div className='min-h-screen'>
            <div className='flex justify-center p-4'>
                {contextHolder}
                <div className='w-8/12 grid grid-cols-2 gap-8'>
                    <div>
                        <img src={product?.img} />
                    </div>
                    <div className='flex flex-col justify-between'>
                        <div>
                            <span className='text-2xl font-semibold'>{product?.name}</span>
                            <br />
                            <span className='text-xl font-semibold text-red-600'>{product?.price.toLocaleString()} VND</span>
                            <div>
                                <Rate disabled defaultValue={product?.rateStar || 5} />
                                <br />
                                <span className='opacity-40'>Số lượt đánh giá:{product?.totalReview}</span>
                            </div>
                            <span>{product?.description}</span>
                        </div>
                        <div className=''>
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
                            <button onClick={() => addToCart()} className='mt-4 bg-green-600 w-fit p-3 rounded-lg text-white'>
                                Thêm vào giỏ hàng ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center p-4'>
                <div className='w-8/12'>
                    <CommentProduct idProduct={id as string} />
                </div>
            </div>
        </div>
    )
}

export default ProductDetail