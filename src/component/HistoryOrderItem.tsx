import { Modal } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RateBox from './RateBox'
import { OrderDetail } from "~/config/Types"
function HistoryOrderItem({ order, idOrder, isPaid }: { order: OrderDetail[], idOrder: string, isPaid: boolean }) {
    const navigate = useNavigate()
    const [isModalOpen, SetIsModalOpen] = useState(false)
    const openModal = () => {
        SetIsModalOpen(true)
    }
    const closeModal = () => {
        SetIsModalOpen(false)
    }
    const renderModal = (idPro: string) => {
        return (
            <Modal footer={null} open={isModalOpen} width={"50%"} onCancel={closeModal}>
                <RateBox productId={idPro} orderId={idOrder}></RateBox>
            </Modal>
        )
    }
    const renderList = () => {
        return order.map((index) => {
            return (
                <div className='flex flex-col lg:flex-row p-2 m-auto'>
                    <img className='lg:w-56 lg:h-56' src={index.img} />
                    <div className='flex flex-col mx-4 font-semibold'>
                        <span>{index.productName}</span>
                        <span>Giá Tiền: {index.price.toLocaleString()} VND</span>
                        <span>Số lượng: {index.quantity}</span>
                        <button onClick={() => navigate(`/product/${index.productId}`)} className='p-1 border rounded-md bg-blue-400 text-white'>
                            Mua Lại
                        </button>
                        {
                            !index.isReview && isPaid && (
                                <button onClick={() => openModal()} className='p-1 border rounded-md bg-blue-400 text-white'>
                                    Đánh giá
                                </button>
                            )
                        }
                    </div>
                    {renderModal(index.productId)}
                </div>
            )
        })
    }
    return (
        <div className='grid lg:grid-cols-2 md:grid-cols-1'>
            {renderList()}
        </div>
    )
}

export default HistoryOrderItem