import React from 'react'
import { useNavigate } from 'react-router-dom'
interface OrderDetail {
    productId: string
    productName: string
    price: number
    quantity: number
    img: string
}
function HistoryOrderItem({ order }: { order: OrderDetail[] }) {
    const navigate = useNavigate()
    const renderList = () => {
        return order.map((index) => {
            return (
                <div className='flex p-2'>
                    <img className='w-40' src={index.img} />
                    <div className='flex flex-col mx-4 font-semibold'>
                        <span>{index.productName}</span>
                        <span>Giá Tiền: {index.price.toLocaleString()} VND</span>
                        <span>Số lượng: {index.quantity}</span>
                        <button onClick={() => navigate(`/product/${index.productId}`)} className='p-2 border rounded-md bg-blue-400 text-white'>
                            Mua Lại
                        </button>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className='flex flex-col space-y-1'>
            {renderList()}
        </div>
    )
}

export default HistoryOrderItem