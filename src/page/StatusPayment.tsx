import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import card_img from '~/resources/card_payment.png'
function StatusPayment() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const status = searchParams.get(`vnp_ResponseCode`) == "00"
    return (
        <div className='flex justify-center min-h-screen items-center '>
            <div className='rounded-2xl w-6/12 space-y-3 border flex flex-col p-8 items-center justify-around'>
                <img src={card_img} className='w-60' />
                <span className='text-red-500 text-xl'>{status ? "Thanh toán thành công" : "Thanh toán thất bại"} </span>
                <button onClick={() => { navigate("/") }} className='bg-green-600 h-12 rounded-2xl px-4
                 hover:text-white transition-colors duration-200 ease-in-out'>Trở lại trang chủ</button>
            </div>
        </div>
    )
}

export default StatusPayment