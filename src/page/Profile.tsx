import { message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { logout } from '~/reducer/authReducer'
import { removeAll } from '~/reducer/cartReducer'
import { AppDispatch, RootState } from '~/redux/store'
import UserService from '~/service/UserService'

function Profile() {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const onClick = () => {
        UserService.logOut().then(() => {
            message.success("Đăng xuất thành công")
        }).finally(() => {
            localStorage.clear()
            dispatch(logout())
            dispatch(removeAll())
            navigate("/")
        })
    }
    const username = useSelector((state: RootState) => state.auth.username)
    return (
        <div className='flex justify-center p-4 min-h-screen'>
            <div className='w-11/12'>
                <div className='flex'>
                    <div className='flex flex-col border  bg-gray-100 w-4/12 shadow-custom h-80 pt-2'>
                        <span className='font-semibold text-center'>Xin chào, {username}</span>
                        <span onClick={() => { navigate('/profile/InfoUser') }} className='font-bold cursor-pointer p-2 mx-auto my-2'>Thông tin cá nhân</span>
                        <span onClick={() => { navigate('/profile/HistoryOrder') }} className='font-bold cursor-pointer p-2 mx-auto my-2'>Lịch sử đơn hàng</span>
                        <span onClick={() => { navigate('/profile/ChangePassword') }} className='font-bold cursor-pointer p-2 mx-auto my-2'>Đổi Mật khẩu</span>
                        <button onClick={() => onClick()} className='border  mx-auto p-2 rounded-md bg-blue-600 text-white'>Đăng Xuất</button>
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