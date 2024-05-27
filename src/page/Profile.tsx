import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { RootState } from '~/redux/store'

function Profile() {
    const username = useSelector((state: RootState) => state.auth.username)
    return (
        <div className='flex justify-center p-4'>
            <div className='w-11/12'>
                <div className='flex'>
                    <div className='flex flex-col border  bg-gray-100 w-4/12 rounded-lg h-80'>
                        <span className='font-semibold text-center'>Xin chào,{username}</span>
                        <button className='p-2 w-40 border mx-auto my-2'>Thông tin cá nhân</button>
                        <button className='p-2 w-40 border mx-auto my-2'>Đổi Mật khẩu</button>
                        <button className='p-2 w-40 border mx-auto my-2'>Lịch sử đơn hàng</button>
                    </div>
                    <div className='flex flex-col rounded-lg border mx-2 w-11/12 border-gray-950 p-2'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile