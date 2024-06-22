import React from 'react'

function Footer() {
    return (
        <div className='w-full flex justify-center p-8 bg-red-500'>
            <div className='grid grid-cols-3 text-white gap-x-40'>
                <div className='text-xl space-y-4'>
                    <span className='text-2xl'>CHÍNH SÁCH</span>
                    <ul>
                        <li><a>Hướng dẫn mua hàng</a></li>
                        <li><a>Hình thức thanh toán</a></li>
                        <li><a>Chính sách đổi trả</a></li>
                        <li><a>Chính sách bảo mật</a></li>
                    </ul>
                </div>
                <div className='text-xl space-y-4'>
                    <span className='text-2xl'>THÔNG TIN</span>
                    <ul>
                        <li><a>Quy định chung</a></li>
                        <li><a>Chính sách giá</a></li>
                        <li><a>Chính sách vận chuyển</a></li>
                        <li><a>Chính sách bảo hành</a></li>
                    </ul>
                </div>
                <div className='text-xl space-y-4'>
                    <span className='text-2xl'>VỀ SHOP</span>
                    <ul>
                        <li><a>Liên hệ</a></li>
                        <li><a>Giới thiệu</a></li>
                        <li><a>Phân phối và hợp tác</a></li>
                        <li><a>Tuyển dụng</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer