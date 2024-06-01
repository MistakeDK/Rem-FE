import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Skeleton } from 'antd'
import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import LOGOCustomize from "~/resources/LOGOCustomize.png"
import SearchBlock from './SearchBlock'
import { useDebounce } from 'use-debounce'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
function Header() {
    const user = useSelector((state: RootState) => state.auth.username)
    const [search, SetSearch] = useState<string>("")
    const [value] = useDebounce(search, 2000)
    const location = useLocation()
    const navigate = useNavigate()
    const hideHeaderForPath = ['/verify', '/Authorization']
    if (hideHeaderForPath.some(path => location.pathname.includes(path))) {
        return <></>
    }
    const goNavigate = (url: string) => {
        navigate(url)
    }

    return (
        <div>
            <div className='flex justify-around p-2'>
                <div className='flex h-1/2 pt-2 relative w-1/2'>
                    <img onClick={() => { navigate("/") }} src={LOGOCustomize} className='w-36 mr-12' />
                    <input onChange={(e) => { SetSearch(e.target.value) }} className='p-2 border-red-300 border rounded-lg w-full focus:outline-none' placeholder='Search'></input>
                    <SearchOutlined className='right-2 bottom-3 absolute' style={{ color: "red", fontSize: "130%" }} />
                    {search?.length !== 0 ? (<SearchBlock search={value} />) : (null)}
                </div>
                <div className='flex pt-4 text-lg'>
                    <p className="relative group" onClick={() => { goNavigate("/") }}>
                        <span className='px-2'>Trang chủ</span>
                        <span className="absolute bottom-2 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 duration-200"></span>
                        <span className="absolute bottom-2 right-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 duration-200"></span>
                    </p>
                    <p className="relative group" onClick={() => { goNavigate("/Introduce") }}>
                        <span className='px-2'>Giới thiệu</span>
                        <span className="absolute bottom-2 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 duration-200"></span>
                        <span className="absolute bottom-2 right-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 duration-200"></span>
                    </p>
                    <p className="relative group" onClick={() => { goNavigate("/Product") }}>
                        <span className='px-2'>Sản Phẩm</span>
                        <span className="absolute bottom-2 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 duration-200"></span>
                        <span className="absolute bottom-2 right-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 duration-200"></span>
                    </p>
                </div>
                <div className='p-2 flex flex-col text-lg'>
                    {
                        user !== null ? (
                            <span onClick={() => navigate("/profile")} className='cursor-pointer'>{user}<UserOutlined /></span>

                        ) : (

                            <span onClick={() => navigate("/login")} className='cursor-pointer'>Đăng nhập<UserOutlined /></span>
                        )
                    }
                    <span onClick={() => navigate("/cart")}>Giỏ hàng <ShoppingCartOutlined className='ml-3 cursor-pointer' /></span>
                </div>
            </div>
        </div>
    )

}
export default Header
