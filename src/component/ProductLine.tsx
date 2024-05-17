import React, { useState } from 'react'
import Product from './Product';
import { productLineProps } from '~/config/Types';
function ProductLine({ productLine }: { productLine: productLineProps }) {
    const [active, SetActive] = useState(false)
    const { name } = productLine
    const imgAdd = () => {
        return (
            <div className='col-span-2 row-span-2'>
                <img className='h-5/6' src='https://i.pinimg.com/564x/ca/dc/19/cadc19250d09ecf1772952143335f6df.jpg' />
            </div>
        )
    }
    return (
        <div>
            <div className='text-center py-2'>
                <span className='text-3xl'>COLLECTION</span>
                <br />
                <span className='text-2xl'>{name}</span>
                <div></div>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-5 w-10/12 gap-2'>
                    <Product product={
                        {
                            name: "abc",
                            price: 123,
                            img: "https://lacdau.com/media/product/1763-a3779c9c2559b07bb05c92503de05c63.png"
                        }
                    } />
                    <Product product={
                        {
                            name: "abc",
                            price: 123,
                            img: "https://lacdau.com/media/product/1763-a3779c9c2559b07bb05c92503de05c63.png"
                        }
                    } />
                    <Product product={
                        {
                            name: "abc",
                            price: 123,
                            img: "https://lacdau.com/media/product/1763-a3779c9c2559b07bb05c92503de05c63.png"
                        }
                    } />
                    {imgAdd()}
                    <Product product={
                        {
                            name: "abc",
                            price: 123,
                            img: "https://lacdau.com/media/product/1763-a3779c9c2559b07bb05c92503de05c63.png"
                        }
                    } />
                    <Product product={
                        {
                            name: "abc",
                            price: 123,
                            img: "https://lacdau.com/media/product/1763-a3779c9c2559b07bb05c92503de05c63.png"
                        }
                    } />
                    <Product product={
                        {
                            name: "abc",
                            price: 123,
                            img: "https://lacdau.com/media/product/1763-a3779c9c2559b07bb05c92503de05c63.png"
                        }
                    } />
                </div>
            </div>
        </div>
    )
}

export default ProductLine