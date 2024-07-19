import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { MenuProps, message, Skeleton } from 'antd'
import { useCallback, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import LOGOCustomize from "~/resources/LOGOCustomize.png"
import SearchBlock from './SearchBlock'
import { useDebounce } from 'use-debounce'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux/store'
import UserService from '~/service/UserService'
import { logout } from '~/reducer/authReducer'
import { removeAll } from '~/reducer/cartReducer'
function Header() {
    const user = useSelector((state: RootState) => state.auth.username)
    const [search, SetSearch] = useState<string>("")
    const [value] = useDebounce(search, 2000)
    const location = useLocation()
    const navigate = useNavigate()
    const hideHeaderForPath = ['/verify', '/Authorization', '/payment', '/admin']
    const inputRef = useRef(null)
    const dispatch: AppDispatch = useDispatch()
    if (hideHeaderForPath.some(path => location.pathname.includes(path))) {
        return <></>
    }
    const goNavigate = (url: string) => {
        navigate(url)
    }
    const logOut = () => {
        UserService.logOut().then((res) => {
            message.success("Đăng xuất thành công")
        }).finally(() => {
            localStorage.removeItem("token")
            dispatch(logout())
            dispatch(removeAll())
            window.location.reload()
        })
    }

    return (
        <div className='sticky z-50 top-0 bg-header'>
            <header className='justify-around hidden lg:flex'>
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
                        user ? (
                            <span onClick={() => goNavigate("/profile")} className='cursor-pointer'><UserOutlined /> {user}</span>

                        ) : (
                            <span onClick={() => goNavigate("/login")} className='cursor-pointer'><UserOutlined /> Đăng nhập</span>
                        )
                    }
                    <span onClick={() => goNavigate("/cart")}><ShoppingCartOutlined className='cursor-pointer' /> Giỏ hàng </span>
                </div>
            </header>
            <header>
                <div className="relative z-20 border-b bg-white lg:hidden">
                    <div className="px-6 md:px-12 lg:container lg:mx-auto lg:px-6 lg:py-4">
                        <div className="flex items-center justify-between">
                            <div className="relative z-20">
                                <button onClick={() => { navigate('/') }}>
                                    <img src={LOGOCustomize} alt="Rem logo" className="w-32" />
                                </button>
                            </div>
                            <div className="flex items-center justify-end border-l lg:border-l-0">
                                <input type="checkbox" ref={inputRef} name="hamburger" id="hamburger" className="peer" hidden />
                                <label htmlFor="hamburger" className="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden">
                                    <div aria-hidden="true" className="m-auto h-0.5 w-6 rounded bg-sky-900 transition duration-300"></div>
                                    <div aria-hidden="true" className="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 transition duration-300"></div>
                                </label>
                                <div className="peer-checked:translate-x-0 fixed inset-0 w-[calc(100%-4.5rem)] translate-x-[-100%] bg-white border-r shadow-xl transition duration-300 lg:border-r-0 lg:w-auto lg:static lg:shadow-none lg:translate-x-0">
                                    <div className="overflow-y-scroll pt-16 flex flex-col h-full  lg:items-center lg:flex-row">
                                        <div className='mt-0 flex justify-center flex-col text-xl'>
                                            <button onClick={() => goNavigate("/")} className='p-2 hover:bg-slate-600 hover:text-white transition-all'>Trang chủ</button>
                                            <button onClick={() => goNavigate("/Introduce")} className='p-2 hover:bg-slate-600 hover:text-white transition-all'>Giới thiệu</button>
                                            <button onClick={() => goNavigate("/Product")} className='p-2 hover:bg-slate-600 hover:text-white transition-all'>Sản phẩm</button>
                                            {
                                                user ? (
                                                    <button onClick={() => goNavigate("/profile")} className='p-2 hover:bg-slate-600 hover:text-white transition-all'>{user}</button>
                                                ) : (
                                                    <button onClick={() => goNavigate("/login")} className='p-2 hover:bg-slate-600 hover:text-white transition-all'>Đăng nhập</button>
                                                )
                                            }
                                            {
                                                user && <button onClick={() => goNavigate("/cart")} className='p-2 hover:bg-slate-600 hover:text-white transition-all'>Giỏ hàng</button>
                                            }
                                            {
                                                user && <button onClick={() => goNavigate("/profile/HistoryOrder")} className='p-2 hover:bg-slate-600 hover:text-white transition-all'>Lịch sử đơn hàng</button>
                                            }
                                            {
                                                user && <button onClick={() => goNavigate("/profile/ChangePassword")} className='p-2 hover:bg-slate-600 hover:text-white transition-all'>Đổi Mật khẩu</button>
                                            }
                                            {
                                                user && <button onClick={() => logOut()} className='p-2 hover:bg-slate-600 hover:text-white transition-all'>Đăng xuất</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )

}
export default Header
