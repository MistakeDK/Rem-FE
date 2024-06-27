import { Button, Result } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '~/reducer/authReducer'
import { removeAll } from '~/reducer/cartReducer'
import { AppDispatch } from '~/redux/store'

function ErrorCode401() {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(logout())
        dispatch(removeAll())
    }, [])
    return (
        <Result className='min-h-screen'
            status="warning"
            title="401"
            subTitle="Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại"
            extra={<Button type="primary" onClick={() => navigate("/login")}>Đăng nhập lại</Button>}
        />
    )
}

export default ErrorCode401