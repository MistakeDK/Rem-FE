import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, Tooltip, Legend, ArcElement, ChartData } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Status } from '~/config/Types'
import OrderService from '~/service/OrderService'
ChartJS.register(Tooltip, Legend, ArcElement)
interface stat {
    status: Status,
    count: number
}
function PieGraph() {
    const [stat, SetStat] = useState<stat[]>([])
    const data: ChartData<"pie", number[], unknown> = {
        labels: ["Chưa giao", "Đang giao", "Đã giao"],
        datasets: [
            {
                label: "Số đơn",
                data: stat.map(s => s.count),
                backgroundColor: [
                    "rgba(255,99,132,0.2)",
                    "rgba(54,162,235,0.2)",
                    "rgba(255,206,86,0.2)",
                ]
            }
        ]
    }
    useEffect(() => {
        OrderService.getStat().then((res) => {
            SetStat(res.data.result)
        })
    }, [])
    return (
        <div className='text-center '>
            <div className='m-auto w-80'>
                <Pie data={data} />
                <span>Tỷ lệ trạng thái các đơn hàng</span>
            </div>
        </div>
    )
}

export default PieGraph