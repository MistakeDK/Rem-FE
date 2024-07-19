
import React, { useState } from 'react'
import CartSumary from '~/component/CartSumary'
import ListCart from '~/component/ListCart'

function Cart() {
    return (
        <div className='lg:flex lg:space-x-4 p-4 justify-center'>
            <div className='lg:w-7/12'>
                <ListCart />
            </div>
            <div className='lg:w-4/12'>
                <CartSumary />
            </div>
        </div>
    )
}

export default Cart