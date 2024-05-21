import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import LOGOCustomize from "~/resources/LOGOCustomize.png"
function Header() {
    const location = useLocation()
    const navigate = useNavigate()
    const hideHeaderForPath = ['/verify']
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
                    <input className='p-2 border-red-300 border relative w-full focus:outline-none' placeholder='Search'></input>
                    <div className='w-12 h-10 flex items-center justify-center absolute bg-red-600 right-0'>
                        <SearchOutlined style={{ color: "white", fontSize: "130%" }} />
                    </div>
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
                    <span onClick={() => navigate("/login")} className='cursor-pointer'>Đăng nhập <UserOutlined /></span>
                    <span>Giỏ hàng <ShoppingCartOutlined className='ml-3 cursor-pointer' /></span>
                </div>
            </div>
        </div>
    )

}

export default Header