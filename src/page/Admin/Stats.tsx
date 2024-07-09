import React from 'react'
import BarGraph from '~/component/BarGraph'
import LineGraph from '~/component/LineGraph'
import PieGraph from '~/component/PieGraph'
function Stats() {
    return (
        <div className='grid-cols-2 grid gap-8'>
            <div>
                <BarGraph />
            </div>
            <div>
                <PieGraph />
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    )
}

export default Stats