import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTotal, setPromotion, removePromotion } from '~/reducer/cartReducer'
import { AppDispatch, RootState } from '~/redux/store'
import PromotionService from '~/service/PromotionService'
import CheckOutBox from './CheckOutBox'

enum PromotionType {
    PERCENT = "PERCENT",
    DIRECT = "DIRECT"
}
function CartSumary() {
    const [isModalOpen, SetIsModalOpen] = useState(false)
    const [code, SetCode] = useState("")
    const dispatch: AppDispatch = useDispatch()
    const PromotionCode = useSelector((state: RootState) => state.cart.promotionCode)
    const total = useSelector((state: RootState) => selectTotal(state, false))
    const preTotal = useSelector((state: RootState) => selectTotal(state, true))
    const addPromotion = () => {
        PromotionService.getById(code).then((res) => {
            switch (res.data.result.type) {
                case (PromotionType.PERCENT): {
                    dispatch(setPromotion({ promotionCode: code, promotionType: PromotionType.PERCENT, promotionValue: res.data.result.value }))
                    break;
                }
                case (PromotionType.DIRECT): {
                    if (preTotal <= res.data.result.value) {
                        message.error(`Đơn hàng cần lớn hơn ${res.data.result.value.toLocaleString()}`)
                    } else {
                        dispatch(setPromotion({ promotionCode: code, promotionType: PromotionType.DIRECT, promotionValue: res.data.result.value }))
                    }
                }
            }
        }).catch(() => {
            message.error("Mã giảm giá không tồn tại")
        })
    }
    const remove = () => {
        dispatch(removePromotion())
    }
    const CloseModal = () => {
        SetIsModalOpen(false)
    }
    const ModalCheckBox = () => {
        return (
            <Modal title={"Thanh Toán đơn hàng của bạn"} open={isModalOpen} width={"30%"} footer={null} onCancel={CloseModal}>
                <CheckOutBox />
            </Modal>
        )
    }
    return (
        <div className=' space-y-4 flex flex-col'>
            <div className='border-gray-300 rounded-lg border p-4'>
                <p className='text-2xl font-bold'>Cart Summary</p>
                <p className='text-xl'>Giá trị đơn hàng: {preTotal.toLocaleString()}</p>
                <p className='text-xl'>giảm giá: {(preTotal - total).toLocaleString()}</p>
                <div className='px-2 bg-gray-300 h-0.5 mt-2'></div>
                <p className='text-xl'>Tổng giá trị: {total.toLocaleString()}</p>
            </div>
            <div className='border-gray-300 rounded-lg border p-4 relative'>
                <p className='text-2xl font-bold'>Mã giảm giá</p>
                <input defaultValue={PromotionCode || ""} onChange={(e) => SetCode(e.target.value)} className='outline-none border-b-2 w-full mt-2' placeholder='Thêm mã giảm giá ...'></input>
                {
                    !PromotionCode ?
                        <button onClick={() => addPromotion()} className='absolute w-32 right-2 bottom-5 text-blue-500'>Thêm vào ngay</button>
                        :
                        <button onClick={() => remove()} className='absolute w-32 right-2 bottom-5 text-blue-500'><FontAwesomeIcon icon={faX} /></button>
                }
            </div>
            <div className='border-gray-300 rounded-lg border p-4 relative'>
                <button onClick={() => { total !== 0 ? SetIsModalOpen(true) : message.info("Vui lòng thêm sản phẩm vào giỏ hàng") }}
                    className='text-center w-full border rounded-lg p-2 bg-blue-600 text-white'>Thanh toán
                </button>
                <p className='mt-2'>The estimated tax will be confirmed once you added your shipping address in checkout.
                    Final prices and shipping costs are confirmed at checkout
                </p>
                {ModalCheckBox()}
            </div>
        </div>
    )
}

export default CartSumary