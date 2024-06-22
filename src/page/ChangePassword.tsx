import { message } from 'antd'
import React, { useState } from 'react'
import { RegisterOptions, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { ChangePasswordForm } from '~/config/Types'
import { RootState } from '~/redux/store'
import UserService from '~/service/UserService'



function ChangePassword() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<ChangePasswordForm>()
    const idUser = useSelector((state: RootState) => state.auth.id)
    const onSubmit = (value: ChangePasswordForm) => {
        UserService.changePassword(idUser as string, value).then((res) => {
            message.success("Đổi mật khẩu thành công")
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }).catch((err) => {
            message.error("Đổi mật khẩu thất bại")
        })
    }
    const ValidateOldPassword: RegisterOptions<ChangePasswordForm, "oldPassword"> = {
        required: "Vui lòng nhập mật khẩu cũ"
    }
    const validateNewPassword: RegisterOptions<ChangePasswordForm, "newPassword"> = {
        required: "Vui lòng nhập lại mật khẩu",
        minLength: {
            message: "Mật khẩu có ít nhất 8 ký tự",
            value: 8
        }
    }
    const validateConfirmPassword: RegisterOptions<ChangePasswordForm, "confirmPassword"> = {
        required: "Vui lòng nhập lại mật khẩu",
        minLength: {
            message: "Mật khẩu có ít nhất 8 ký tự",
            value: 8
        },
        validate: (value) => {
            if (value === getValues("newPassword")) {
                return true;
            }
            return "Mật khẩu nhập lại không khớp"

        }
    }
    return (
        <div className=''>
            <span className='font-semibold'>Đổi mật khẩu</span>
            <div className='w-full border h-0.5 bg-gray-400'></div>
            <div className='mt-12 flex justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-col items-end space-y-2'>
                        <label>Mật khẩu cũ: </label>
                        <br />
                        <label>Mật khẩu mới: </label>
                        <br />
                        <label>Nhập lại mật khẩu: </label>
                    </div>
                    <div className='flex flex-col space-y-1 relative'>
                        <input type="password" className='border-b-2 outline-none' {...register("oldPassword", ValidateOldPassword)}></input>
                        {errors.oldPassword ? <span className='text-red-500'>{errors.oldPassword.message}</span> : <span className='h-6'></span>}
                        <input type="password" className='border-b-2 outline-none' {...register("newPassword", validateNewPassword)}></input>
                        {errors.newPassword ? <span className='text-red-500'>{errors.newPassword.message}</span> : <span className='h-6'></span>}
                        <input type="password" className='border-b-2 outline-none' {...register("confirmPassword", validateConfirmPassword)}></input>
                        {errors.confirmPassword ? <span className='text-red-500'>{errors.confirmPassword.message}</span> : <span className='h-6'></span>}
                    </div>
                    <button className='col-span-2 p-2 bg-blue-600 text-white rounded-lg m-auto hover:'>Xác nhận</button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword