import { AppstoreOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons';
import { faFirstOrder } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, Menu, MenuProps, message } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import { AppDispatch } from '~/redux/store';
import LOGO from '~/resources/LOGOCustomize.png'
import UserService from '~/service/UserService';
import { logout } from '~/reducer/authReducer'
import { faChartSimple, faTicket } from '@fortawesome/free-solid-svg-icons';


type MenuItem = Required<MenuProps>['items'][number];
function HomeAdmin() {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const items: MenuItem[] = [
        {
            key: 'product',
            label: 'Quản lý sản phẩm',
            icon: <ProductOutlined />,
            children: [
                { key: "ListProduct", label: 'Danh sách sản phẩm' },
                { key: 'CreateProduct', label: 'Thêm sản phẩm' },
            ],
        },
        {
            key: 'category',
            label: 'Quản lý Danh mục',
            icon: <AppstoreOutlined />,
            children: [
                { key: 'ListCategory', label: 'Danh sách danh mục' }
            ],
        },

        {
            key: 'user',
            label: 'Quản lý người dùng',
            icon: <UserOutlined />,
            children: [
                { key: 'ListUser', label: 'Danh sách người dùng' },
            ],
        },
        {
            key: 'order',
            label: 'Quản lý đơn hàng',
            icon: <FontAwesomeIcon icon={faFirstOrder} />,
            children: [
                { key: 'ListOrder', label: "Danh Sách đơn hàng" }
            ]
        },
        {
            key: 'promotion',
            label: "Quản lý Khuyến mãi",
            icon: <FontAwesomeIcon icon={faTicket} />,
            children: [
                { key: 'ListPromotion', label: "Danh sách khuyến mãi" },
                { key: 'CreatePromotion', label: "Thêm Khuyến mãi" }
            ]
        },
        {
            type: 'divider'
        },
        {
            key: 'stats',
            label: "Thống kê",
            icon: <FontAwesomeIcon icon={faChartSimple} />
        }
    ];
    const onClick: MenuProps['onClick'] = (e) => {
        if (e.keyPath[1]) {
            navigate(`${e.keyPath[1]}/${e.keyPath[0]}`)
        }
        else {

            navigate(`${e.keyPath[0]}`)
        }
    };
    const onClickLogout = () => {
        UserService.logOut().then((res) => {
            message.success("Đăng xuất thành công")
        }).finally(() => {
            dispatch(logout())
            localStorage.clear()
            navigate("/")
        })
    }
    return (
        <div className='grid grid-cols-12 p-2 w-full gap-2 min-h-screen'>
            <div className='col-span-2'>
                <img src={LOGO} className='mx-auto w-8/12' />
                <Menu
                    onClick={onClick}
                    mode="inline"
                    items={items}
                />
                <button onClick={() => onClickLogout()} className='p-2 m-auto flex text-white rounded-lg my-4 bg-blue-600'>Đăng xuất</button>
            </div>
            <div className='col-span-10 min-h-screen w-full border bg-outlet-admin p-2'>
                <Outlet />
            </div>
        </div>
    )
}

export default HomeAdmin