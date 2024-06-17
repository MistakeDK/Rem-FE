import { CheckCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { Skeleton, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import UserService from '~/service/UserService'

function VerifyAccount() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const code = searchParams.get(`code`) || ""
    const username = searchParams.get(`username`) || ""
    const [loading, SetLoading] = useState(true)
    useEffect(() => {
        const callApi = async () => {
            await UserService.verifyAccount(code, username).
                then((res) => {
                    SetLoading(!loading)
                }).
                catch(() => { message.error("Xác thực thất bại") })
        }
        callApi()
    }, [])
    return (
        <div className='flex justify-center min-h-screen items-center '>
            {loading ? (
                <div className='rounded-2xl w-6/12 border h-80 flex flex-col p-8 items-center justify-around'>
                    <LoadingOutlined style={{ fontSize: "400%" }} />
                    <Skeleton.Input active={loading}></Skeleton.Input>
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

export default VerifyAccount