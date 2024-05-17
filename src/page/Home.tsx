import React from 'react'
import CarouselHome from '~/component/CarouselHome'
import ProductLine from '~/component/ProductLine'

function Home() {
    return (
        <div className='px-0.5'>
            <CarouselHome />
            <div></div>
            <ProductLine productLine={{
                id: "OP",
                name: "ONE PIECE"
            }} />
            <ProductLine productLine={{
                id: "NA",
                name: "NARUTO"
            }} />
        </div>
    )
}

export default Home