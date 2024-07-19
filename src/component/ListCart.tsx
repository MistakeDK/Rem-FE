import { Result, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '~/component/CartItem'
import { setItems } from '~/reducer/cartReducer'
import { AppDispatch, RootState } from '~/redux/store'
import CartService from '~/service/CartService'

interface CartItem {
    id: string,
    name: string,
    price: number,
    img: string,
    quantity: number,
    active: boolean
}

function ListCart() {
    const idUser = useSelector((state: RootState) => state.auth.id) || ""
    const [cartItem, SetCartItem] = useState<CartItem[]>([])
    const dispatch: AppDispatch = useDispatch()
    const render = () => {
        return (
            cartItem.map((index) => {
                return <CartItem prop={index} />
            })
        )
    }
    const listCartEmptyScreen = () => {
        return (
            <Result status={'info'} subTitle="Vui lòng thêm sản phẩm vào giỏ hàng" title="Giỏ hàng rỗng"></Result>
        )
    }
    useEffect(() => {
        CartService.getList(idUser).then(async (res) => {
            SetCartItem(res.data.result)
            dispatch(setItems(res.data.result))
        }).catch(() => {

            message.error("Lỗi Server")
        })
    }, [])

    return (
        <div className='flex flex-col mb-4'>
            <div className='lg:min-h-svh p-4 border border-gray-300 rounded-lg divide-y-2'>
                {cartItem.length > 0 ? render() : listCartEmptyScreen()}
            </div>
        </div>)


}

export default ListCart