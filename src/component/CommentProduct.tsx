import { UserOutlined } from '@ant-design/icons'
import { Avatar, Rate, Result } from 'antd'
import React, { useEffect, useState } from 'react'
import { review } from '~/config/Types'
import ReviewService from '~/service/ReviewService'
import Util from '~/util/Util'

function CommentProduct({ idProduct }: { idProduct: string }) {
    const [page, SetPage] = useState(1)
    const [totalPage, SetTotalPage] = useState(0)
    const [comment, SetComment] = useState<review[]>([])
    useEffect(() => {
        const urlParam = new URLSearchParams
        urlParam.set("pageNo", page.toString())
        ReviewService.getReviewByProduct(idProduct, urlParam).then((res) => {
            if (page !== 1) {
                SetComment([...comment, ...res.data.result.items])
            } else {
                SetComment(res.data.result.items)
            }
            SetTotalPage(res.data.result.totalPage)
        })
    }, [page, idProduct])
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight && page < totalPage) {
                SetPage((prevPage) => prevPage + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page, totalPage]);
    const renderListComment = () => {
        return comment.map((index) => {
            return (
                <div className='flex'>
                    <Avatar className='mt-1' style={{ backgroundColor: '#87d068' }} size={'large'} icon={<UserOutlined />} />
                    <div className='mx-2 flex flex-col'>
                        <span>{index.username}-{Util.formatDate(index.timeCreate)}</span>
                        <Rate value={index.rateStar} disabled ></Rate>
                        <p className='mt-1'>
                            {index.review}
                        </p>
                    </div>
                </div>
            )
        })
    }
    const nullComentScreen = () => {
        return (
            null
        )
    }
    const borderComment = () => {
        return (
            comment.length !== 0 ? (
                <div className='flex flex-col justify-center lg:w-6/12 py-2'>
                    {renderListComment()}
                </div>
            ) : (
                nullComentScreen()
            )
        )
    }
    return (
        <div>
            {borderComment()}
        </div>
    )
}

export default CommentProduct