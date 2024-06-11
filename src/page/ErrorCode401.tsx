import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorCode401() {
    const navigate = useNavigate()
    return (
        <Result
            status="warning"
            title="401"
            subTitle="Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại"
            extra={<Button type="primary" onClick={() => navigate("/login")}>Đăng nhập lại</Button>}
        />
    )
}

export default ErrorCode401