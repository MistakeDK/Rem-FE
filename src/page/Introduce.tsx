import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Introduce() {
    const navigate = useNavigate()
    return (
        <Result className='min-h-screen'
            status="info"
            title="Trang web Chưa phát triển"
            subTitle="Vui lòng thử lại sau"
            extra={<Button type="primary" onClick={() => navigate("/")} >Trở về trang chủ</Button>}
        />
    )
}

export default Introduce