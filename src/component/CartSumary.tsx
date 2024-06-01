import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'

function CartSumary() {
    const total = useSelector((state: RootState) => state.cart.total)
    return (
        <div className=' space-y-4 flex flex-col'>
            <div className='border-gray-300 rounded-lg border p-4'>
                <p className='text-2xl font-bold'>Cart Summary</p>
                <p className='text-xl'>Giá trị đơn hàng  {total.toLocaleString()}</p>
                <p className='text-xl'>Phí ship</p>
                <div className='px-2 bg-gray-300 h-0.5 mt-2'></div>
                <p className='text-xl'>Tổng giá trị</p>
            </div>
            <div className='border-gray-300 rounded-lg border p-4 relative'>
                <p className='text-2xl font-bold'>Mã giảm giá</p>
                <input className='outline-none border-b-2 w-full mt-2' placeholder='Thêm mã giảm giá ...'></input>
                <button className='absolute w-32 right-2 bottom-5 text-blue-500'>Thêm vào ngay</button>
            </div>
            <div className='border-gray-300 rounded-lg border p-4 relative'>
                <button className='text-center w-full border rounded-lg p-2 bg-blue-600 text-white'>Thanh toán</button>
                <p className='mt-2'>The estimated tax will be confirmed once you added your shipping address in checkout.
                    Final prices and shipping costs are confirmed at checkout
                </p>
            </div>
        </div>
    )
}

export default CartSumary