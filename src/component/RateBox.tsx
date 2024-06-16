import { Input, Rate, message, notification } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import ReviewService from '~/service/ReviewService'

type NotificationType = 'success' | 'info' | 'warning' | 'error';
function RateBox({ productId, orderId }: { productId: string, orderId: string }) {
    const { TextArea } = Input
    const [rateStar, SetRateStar] = useState(5)
    const [review, SetReview] = useState<string>("")
    const idUser = useSelector((state: RootState) => state.auth.id) || ""
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Gửi đánh giá thành công',
        });
    };
    const onChange = (value: number) => {
        SetRateStar(value)
    }
    const sendReview = () => {
        ReviewService.sendReview({ review, idUser, productId, rateStar, orderId }).then(() => {
            openNotificationWithIcon('success')
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        }).catch(() => {
            message.error("Lỗi server")
        })

    }
    return (
        <div className='text-center'>
            {contextHolder}
            <Rate allowClear={false} className='text-4xl pb-10' defaultValue={rateStar} onChange={onChange}></Rate>
            <div>
                <TextArea rows={10} maxLength={150} onChange={(e) => SetReview(e.target.value)}>

                </TextArea>
            </div>
            <button onClick={sendReview} className='py-3 px-24 mt-2 rounded-lg text-white bg-blue-600 hover:bg-green-600 transition-all '>
                Gửi đánh giá
            </button>
        </div>
    )
}

export default RateBox