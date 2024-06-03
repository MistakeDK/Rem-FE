import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '~/redux/store'


function PrivateRoute() {
    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated)
    return (
        isAuth ? <Outlet /> : <Navigate to={"/login"} replace />
    )
}

export default PrivateRoute