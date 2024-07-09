import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Legend, ChartData, BarOptions } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { user } from '~/config/Types'
import UserService from '~/service/UserService'
ChartJS.register(
    CategoryScale, LinearScale, Title, Legend, BarElement
)
interface stat {
    userProvide: keyof user["userProvide"]
    count: number
}
function BarGraph() {
    const [stat, SetStat] = useState<stat[]>([])
    const data: ChartData<"bar", number[], unknown> = {
        labels: stat.map(s => s.userProvide),
        datasets: [
            {
                label: "Số lượng",
                data: stat.map(s => s.count),
                backgroundColor: ["green"],
                borderColor: "green",
                borderWidth: 1
            }
        ],
    }

    useEffect(() => {
        UserService.getStat().then((res) => {
            SetStat(res.data.result)
        })
    }, [])
    return (
        <div className='text-center'>
            <Bar data={data} />
            <span>Tổng người dùng theo phân loại</span>
        </div>
    )
}

export default BarGraph