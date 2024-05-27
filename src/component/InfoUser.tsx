import { Form, Input, Spin, message } from 'antd'
import React, { useEffect, useState } from 'react'
import UserService from '~/service/UserService'

interface userInfo {
    username: string,
    email: string,
    phone: string,
    dob: string
}
function InfoUser() {
    const [isLoading, SetIsLoading] = useState(true)
    const [userInfo, SetUserInfo] = useState<userInfo>()
    useEffect(() => {
        UserService.getMyInfo().then((res) => {
            console.log(res.data)
            SetUserInfo(res.data.result)
        }).catch(() => {
            message.error("Lỗi Server")
        }).finally(() => {
            SetIsLoading(false)
        })
    }, [])
    return (
        !isLoading ? (<div>
            <span className='font-semibold'>Thông tin cá nhân</span>
            <div className='w-full border h-0.5 bg-gray-400'></div>
            <Form className='mt-12'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}>
                <Form.Item<userInfo>
                    label="Tên tài khoản"
                    name="username"
                >
                    <Input className='w-4/12' disabled defaultValue={userInfo?.username} />
                </Form.Item>
                <Form.Item<userInfo>
                    label="Email"
                    name="email"
                >
                    <Input className='w-4/12' disabled defaultValue={userInfo?.email} />
                </Form.Item>
                <Form.Item<userInfo>
                    label="Số điện thoại"
                    name="phone"
                >
                    <Input className='w-4/12' disabled defaultValue={userInfo?.phone} />
                </Form.Item>

            </Form>
        </div>) : (<Spin />)
    )
}

export default InfoUser