import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Chart, LineOptions, ChartData, Point } from 'chart.js'
ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Legend
)
function LineGraph() {
    const data: ChartData<'line', number[], unknown> = {
        labels: [
            "Monday",
            "TuesDay",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],
        datasets: [
            {
                label: 'Local',
                data: [3000, 5000, 4500, 6000, 7000, 9000],
                borderColor: "red"
            },
            {
                label: "google",
                data: [],
                borderColor: "green"
            }
        ],
    };
    return (
        <Line data={data} />
    )
}

export default LineGraph 