import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, Result, message } from 'antd'
import { AxiosError } from 'axios'
import React, { useCallback, useState } from 'react'
import { RegisterOptions, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PromotionType, promotion } from '~/config/Types'
import PromotionService from '~/service/PromotionService'
import Util from '~/util/Util'

function CreatePromotion() {
    const { register, getValues, formState: { errors }, handleSubmit, setError } = useForm<promotion>()
    const [IsOpen, SetIsOpen] = useState(false)
    const navigate = useNavigate()
    const validatePromotionCode: RegisterOptions<promotion, "promotionCode"> = {
        required: "Giá trị không thể để trống"
    }
    const validateValue: RegisterOptions<promotion, "value"> = {
        required: "Giá trị không thể để trống",
        validate: (value) => {
            if (getValues("type") === PromotionType.PERCENT && (value > 100 || value < 0))
                return "Giá trị voucher không hợp lệ"
            return true
        }
    }
    const openModal = useCallback(() => {
        SetIsOpen(true)
    }, [])
    const closeModal = useCallback(() => {
        SetIsOpen(false)
    }, [])
    const onSubmit = (form: promotion) => {
        openModal()
    }
    const modalConfirm = () => {
        const onCreate = () => {
            PromotionService.addPromotion({
                promotionCode: getValues("promotionCode"),
                type: getValues("type"),
                value: getValues("value")
            }).then((res) => {
                message.success("Thêm mã giảm giá thành công")
                navigate('/admin/promotion/ListPromotion')
            }).catch((err) => {
                setError("promotionCode", {
                    message: Util.SetErrorField(err)
                })
            }).finally(() => {
                closeModal()
            })
        }
        return (
            <Modal open={IsOpen} footer={false} onCancel={closeModal} >
                <Result title="Sau khi tạo không thể xóa hoặc chỉnh sửa" extra={<Button onClick={onCreate}>Xác nhận</Button>} status={'info'}>
                </Result>
            </Modal>
        )
    }
    return (
        <div className='m-20'>
            <div className='grid grid-cols-2 w-8/12 gap-4'>
                <div className='flex flex-col space-y-8 text-xl items-end'>
                    <label>Mã giảm giá:</label>
                    <label>Giá Trị:</label>
                    <label>Phân loại:</label>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col text-xl space-y-1'>
                    <input className='outline-none px-0.5' {...register("promotionCode", validatePromotionCode)}></input>
                    {errors.promotionCode ? <span className='text-red-500 h-6'>{errors.promotionCode.message}</span> : <span className='h-6'></span>}
                    <input className='outline-none px-0.5' type='number' {...register("value", validateValue)}></input>
                    {errors.value ? <span className='text-red-500 h-6'>{errors.value.message}</span> : <span className='h-6'></span>}
                    <select {...register("type")}>
                        <option value={PromotionType.DIRECT}>Trực tiếp</option>
                        <option value={PromotionType.PERCENT}>Phần trăm</option>
                    </select>
                    <div className=''>
                        <button className='w-full rounded-md bg-blue-600 p-2 text-white'>
                            Xác nhận
                        </button>
                    </div>
                </form>
                {modalConfirm()}
            </div>
        </div>
    )
}

export default CreatePromotion