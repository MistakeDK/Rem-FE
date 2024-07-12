import React from 'react'
import CarouselHome from '~/component/CarouselHome'
import HomeProduct from '~/component/HomeProduct'
import HotProductList from '~/component/HotProductList'
import NewProductList from '~/component/NewProductList'

function Home() {
    return (
        <div className='px-0.5'>
            <CarouselHome />
            <div className='lg:flex justify-center lg:space-x-14 m-4 lg:px-12'>
                <HotProductList />
                <NewProductList />
            </div>
            <div className='m-4 lg:px-4'>
                <HomeProduct />
            </div>
        </div>
    )
}

export default Home