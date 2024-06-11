import { Button, Result } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ErrorCode500() {
    const navigate = useNavigate()
    return (
        <Result
            status="500"
            title="500"
            subTitle="Đã có lỗi xảy ra"
            extra={<Button onClick={() => navigate("/")} type="primary">Về trang chủ</Button>}
        />
    )
}

export default ErrorCode500