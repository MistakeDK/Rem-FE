import { text } from '@fortawesome/fontawesome-svg-core'
import { Pagination, Table, TableProps, Tag, message } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { PromotionType, promotion } from '~/config/Types'
import PromotionService from '~/service/PromotionService'
import Util from '~/util/Util'


function ListPromotion() {
    const [promotions, SetPromotions] = useState<promotion[]>([])
    const [searchParams, SetSearchParams] = useSearchParams()
    const [currentPage, SetCurrentPage] = useState<number>(1)
    const [totalPage, SetTotalPage] = useState<number>()
    const columns: TableProps<promotion>['columns'] = [
        {
            title: "Mã Khuyến mãi",
            dataIndex: "promotionCode",
            key: "promotionCode",
            render: (text) => <span>{text}</span>
        },
        {
            title: "Loại Khuyến mãi",
            dataIndex: 'type',
            key: "type",
            render: (text) => {
                if (text === PromotionType.DIRECT)
                    return <Tag color='red'>{text}</Tag>
                return <Tag color='blue'>{text}</Tag>
            }
        },
        {
            title: "Giá trị",
            dataIndex: "value",
            key: "value",
            render: (text, record) => {
                if (record.type === PromotionType.DIRECT)
                    return <span>{text.toLocaleString()}</span>
                return <span>{text}%</span>
            }
        },
        {
            title: "Trạng thái",
            dataIndex: "active",
            key: "active",
            render: (text) => {
                if (text) {
                    return <Tag color='blue'>Hoạt động</Tag>
                }
                return <Tag color='red'>Không hoạt động</Tag>
            }
        },
        {
            title: "Thao tác",
            key: "Action",
            render: (value, record) => {
                return (
                    <button className='border p-1 rounded-md hover:bg-blue-600 hover:text-white transition-all' onClick={() => onChangeStatus(record.promotionCode)}>
                        Đổi trạng thái
                    </button>
                )
            }
        }
    ]
    const onChangeStatus = useCallback((id: string) => {
        PromotionService.changeStatus(id).then((res) => {
            message.success("Đổi trạng thái thành công")
            updatePromotion(id)
        }).catch(() => {
            message.error("Lỗi Server")
        })
    }, [])
    const updatePromotion = useCallback((id: string) => {
        SetPromotions((prevPromotions) => {
            const index = prevPromotions.findIndex((value) => value.promotionCode === id);
            if (index !== -1) {
                const newPromotions = [...prevPromotions];
                newPromotions[index] = { ...newPromotions[index], active: !newPromotions[index].active };
                return newPromotions;
            }
            return prevPromotions;
        });
    }, [])
    const onChangePage = (page: number) => {
        searchParams.set("pageNo", page.toString())
        SetSearchParams(searchParams)
        SetCurrentPage(page)
    }
    const { register, handleSubmit } = useForm<promotion>()
    const onSearch = useCallback((form: promotion) => {
        const updatedParams = new URLSearchParams()
        updatedParams.set("promotion", `promotionCode~${form.promotionCode}`)
        form.type !== PromotionType.ALL && updatedParams.append("promotion", `,type:${form.type}`)
        SetSearchParams(updatedParams)
    }, [])
    useEffect(() => {
        PromotionService.getList(searchParams).then((res) => {
            SetPromotions(res.data.result.items)
            SetTotalPage(res.data.result.totalPage)
            SetCurrentPage(Util.ConvertNumberPage(res.data.result.pageNo))
        })
    }, [searchParams])
    return (
        <div>
            <div className='space-y-2'>
                <form className='flex space-x-4' onSubmit={handleSubmit(onSearch)}>
                    <label>Mã code:</label>
                    <input {...register("promotionCode")} type='text'></input>
                    <label>Loại mã:</label>
                    <select {...register("type")}>
                        <option value={PromotionType.DIRECT}>Trực tiếp</option>
                        <option value={PromotionType.PERCENT}>Phần trăm</option>
                        <option value={PromotionType.ALL}>Tất cả</option>
                    </select>
                    <button className='bg-blue-500 text-white rounded-lg px-4'>Tìm kiếm</button>
                </form>
                <Table columns={columns} dataSource={promotions} pagination={false}></Table>
            </div>
            <div className='flex justify-end mt-2'>
                <Pagination defaultCurrent={currentPage} current={currentPage} pageSize={8} total={totalPage} onChange={onChangePage} showSizeChanger={false} />
            </div>
        </div>
    )
}

export default ListPromotion