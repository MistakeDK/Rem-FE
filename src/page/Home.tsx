import React from 'react'
import CarouselHome from '~/component/CarouselHome'
import ProductLine from '~/component/ProductLine'

function Home() {
    return (
        <div className='px-0.5'>
            <CarouselHome />
            <div></div>
            <ProductLine category='One Piece' />
            <ProductLine category='Naruto' />
        </div>
    )
}

export default Home