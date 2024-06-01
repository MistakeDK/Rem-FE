import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { message } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, updateQuantity } from '~/reducer/cartReducer'
import { AppDispatch, RootState } from '~/redux/store'
import CartService from '~/service/CartService'

interface prop {
    id: string,
    name: string,
    price: number,
    img: string,
    quantity: number,
    active: boolean,
}
enum action {
    INCREASE = "INCREASE",
    DECREASE = "DECREASE",
    DELETE = "DELETE"
}
function CartItem({ prop }: { prop: prop }) {
    const idUser = useSelector((state: RootState) => state.auth.id) || ""
    const [quantity, SetQuantity] = useState(prop.quantity)
    const dispatch: AppDispatch = useDispatch();
    const increase = () => {
        CartService.changeQuantity(idUser, prop.id, action.INCREASE.toString())
            .then(() => {
                SetQuantity((pre) => pre + 1);
                dispatch(updateQuantity({ id: prop.id, quantity: quantity + 1 }));
            }).catch(() => {
                message.error("Lỗi Server");
            });
    };

    const decrease = () => {
        CartService.changeQuantity(idUser, prop.id, action.DECREASE.toString())
            .then(() => {
                SetQuantity((pre) => pre - 1);
                if (quantity - 1 > 0) {
                    dispatch(updateQuantity({ id: prop.id, quantity: quantity - 1 }));
                } else {
                    dispatch(removeItem(prop.id));
                }
            }).catch(() => {
                message.error("Lỗi Server");
            });
    };

    if (quantity === 0) {
        return <></>
    }
    return (
        <div>
            <div className='flex my-2'>
                <img className='w-48 rounded-md' src={prop.img} />
                <div className='flex flex-col mx-4 w-full'>
                    <div className='w-full flex justify-between font-bold text-xl'>
                        <span>{prop.name}</span>
                        <span className='text-right'>{prop.price.toLocaleString()}</span>
                    </div>
                    <span className='font-semibold text-gray-600'>Số lượng:{quantity}</span>
                    <div className='items-center flex w-2/12 h-14 mt-4 border rounded-2xl border-gray-950 text-center'>
                        <button className='w-1/3' onClick={() => decrease()}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className='w-1/3'>{quantity}</span>
                        <button className='w-1/3' onClick={() => increase()}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem