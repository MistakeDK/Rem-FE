import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removePromotion, selectTotal } from '~/reducer/cartReducer'
import { AppDispatch, RootState } from '~/redux/store'
import OrderService from '~/service/OrderService'

enum paymentMethod {
    VNPAY = "VNPAY",
    CASH = "CASH"
}
interface formCheckOut {
    name: string,
    phone: string,
    address: string,
    userId: string,
    paymentType: paymentMethod
}
function CheckOutBox() {
    const navigate = useNavigate()
    const userId = useSelector((state: RootState) => state.auth.id) || ""
    const total = useSelector((state: RootState) => selectTotal(state, false))
    const promotionCode = useSelector((state: RootState) => state.cart.promotionCode)
    const dispatch: AppDispatch = useDispatch()
    const [formData, SetFormData] = useState<formCheckOut>({
        name: "",
        address: "",
        phone: "",
        userId: userId,
        paymentType: paymentMethod.CASH
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        SetFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        OrderService.CreateOrder(formData, promotionCode).then((res) => {
            dispatch(removePromotion())
            setTimeout(() => {
                navigate("/")
            }, 1500)
            message.success("Đặt hàng thành công")
        }).catch(() => {
            message.error("Đặt hàng thất bại")
        })

    }
    return (
        <div className=''>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4 relative'>
                <div>
                    <label className='' htmlFor='name'>Tên người nhận: </label>
                    <input onChange={handleChange} id='name' type='tmake ext' name='name' className='outline-none border-b-2 w-[300px]'></input>
                </div>
                <div>
                    <label className='' htmlFor='address'>Địa Chỉ: </label>
                    <input onChange={handleChange} id='address' type='text' name='address' className='outline-none border-b-2 w-[350px]'></input>
                </div>
                <div>
                    <label className='' htmlFor='phone'>Số điện thoại: </label>
                    <input onChange={handleChange} id='phone' type='text' name='phone' className='outline-none border-b-2 w-[310px]'></input>
                </div>
                <div>
                    <input onChange={handleChange} name='method' id='Cash' type='radio' value={paymentMethod.CASH}></input>
                    <label htmlFor='Cash'> Thanh toán bằng tiền mặt</label>
                </div>
                <div>
                    <input onChange={handleChange} name='method' id='VNPAY' type='radio' value={paymentMethod.VNPAY}></input>
                    <label htmlFor='VNPAY'> Thanh toán qua VNPay</label>
                </div>
                <span>Giá trị đơn hàng cần thanh toán: {total.toLocaleString()}</span>
                <button type='submit'>Đặt hàng ngay</button>
            </form>
        </div>
    )
}

export default CheckOutBox