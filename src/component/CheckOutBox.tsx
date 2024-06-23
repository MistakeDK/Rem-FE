import { message, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removePromotion, selectTotal } from '~/reducer/cartReducer'
import { AppDispatch, RootState } from '~/redux/store'
import OrderService from '~/service/OrderService'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import { NotificationType, formCheckOut, paymentType } from "~/config/Types"
import PaymentService from '~/service/PaymentService'
function CheckOutBox() {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message: message,
            description: description
        });
    };
    const navigate = useNavigate()
    const userId = useSelector((state: RootState) => state.auth.id) || ""
    const total = useSelector((state: RootState) => selectTotal(state, false))
    const promotionCode = useSelector((state: RootState) => state.cart.promotionCode)
    const dispatch: AppDispatch = useDispatch()
    const { register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<formCheckOut>()
    const onSubmit: SubmitHandler<formCheckOut> = async (data) => {
        const result = await OrderService.CreateOrder({ ...data }, promotionCode, userId)
        if (data.paymentType === paymentType.CASH) {
            dispatch(removePromotion())
            openNotificationWithIcon('success', "Đặt hàng thành công", "")
            setTimeout(() => {
                navigate("/")
            }, 1500)
            return;
        }
        PaymentService.paymentVNPay(total, result.data.result).then((res) => {
            window.open(res.data.result)
        })
    }
    const validateName: RegisterOptions<formCheckOut, "name"> = {
        required: "Vui lòng nhập tên người nhận"
    }
    const validateAddress: RegisterOptions<formCheckOut, "address"> = {
        required: "Vui lòng nhập địa chỉ"
    }
    const validatePhone: RegisterOptions<formCheckOut, "phone"> = {
        required: "Vui lòng nhập Số điện thoại",
        minLength: {
            value: 10,
            message: "Số điện thoại phải có 10 chữ số"
        },
        maxLength: {
            value: 10,
            message: "Số điện thoại phải có 10 chữ số"
        }
    }
    return (
        <div className=''>
            {contextHolder}
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4 relative'>
                <div>
                    <label className='' htmlFor='name'>Tên người nhận: </label>
                    <input {...register("name", validateName)} id='name' type='text' name='name' className='outline-none border-b-2 block w-full'></input>
                </div>
                {errors.name && <div className='text-red-500'>{errors.name.message}</div>}
                <div>
                    <label className='' htmlFor='address'>Địa Chỉ: </label>
                    <input {...register("address", validateAddress)} id='address' type='text' name='address' className='outline-none border-b-2 block w-full'></input>
                </div>
                {errors.address && <div className='text-red-500'>{errors.address.message}</div>}
                <div>
                    <label className='' htmlFor='phone'>Số điện thoại: </label>
                    <input {...register("phone", validatePhone)} id='phone' type='text' name='phone' className='outline-none border-b-2 block w-full'></input>
                </div>
                {errors.phone && <div className='text-red-500'>{errors.phone.message}</div>}
                <span>Giá trị đơn hàng cần thanh toán: {total.toLocaleString()}</span>
                <div>
                    <input {...register('paymentType')} defaultChecked name='paymentType' id='CASH' type='radio' value={paymentType.CASH}></input>
                    <label htmlFor='CASH'> Thanh toán bằng tiền mặt</label>
                </div>
                <div>
                    <input {...register('paymentType')} name='paymentType' id='VNPAY' type='radio' value={paymentType.VNPAY}></input>
                    <label htmlFor='VNPAY'> Thanh toán qua VNPay</label>
                </div>
                <button className='border w-5/12 m-auto p-2 rounded-lg hover:bg-blue-600 hover:text-white duration-200' type='submit'>Đặt hàng ngay</button>
            </form>
        </div>
    )
}

export default CheckOutBox