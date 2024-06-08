import { CheckCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { Skeleton, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '~/reducer/authReducer'
import { AppDispatch } from '~/redux/store'
import UserService from '~/service/UserService'

function AuthorizationOAuth2() {
    const [isloading, SetIsLoading] = useState(true)
    const navigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search)
    const auth = urlParams.get("name") || ""
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        UserService.login(auth, "").then((res) => {
            dispatch(login({ username: auth, isAuthenticated: true, id: res.data }))
            localStorage.setItem('token', res.data.result.token)
        }).catch(() => {
            message.error("Lỗi Server")
        }).finally(() => {
            SetIsLoading(false)
        })
    }, [])
    return (
        <div className='flex justify-center min-h-screen items-center '>
            {isloading ? (
                <div className='rounded-2xl w-6/12 border h-80 flex flex-col p-8 items-center justify-around'>
                    <LoadingOutlined style={{ fontSize: "400%" }} />
                    <Skeleton.Input active={isloading}></Skeleton.Input>
                </div>
            ) : (
                <div className='rounded-2xl w-6/12 border h-80 flex flex-col p-8 items-center justify-around'>
                    <CheckCircleFilled style={{ fontSize: "400%", color: "green" }} />
                    <span>Xác Thực Thành Công </span>
                    <button onClick={() => { navigate("/") }} className='bg-green-600 h-12 rounded-2xl px-4 hover:text-white transition-colors duration-200 ease-in-out'>Trở lại trang chủ</button>
                </div>
            )}

        </div>
    )
}

export default AuthorizationOAuth2