import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorCode404() {
    const navigate = useNavigate()
    return (
        <Result className='min-h-screen'
            status="404"
            title="404"
            subTitle="Trang không tồn tại"
            extra={<Button type="primary" onClick={() => { navigate("/") }}>Trở về trang chủ</Button>}
        />
    )
}

export default ErrorCode404