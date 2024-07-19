import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
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
    const remove = () => {
        CartService.changeQuantity(idUser, prop.id, action.DELETE.toString())
            .then(() => {
                dispatch(removeItem(prop.id))
                SetQuantity(0)
            })
            .catch(() => {
                message.error("Lỗi Server")
            })
    }

    if (quantity === 0) {
        return <></>
    }
    return (
        <div>
            <div className='flex my-2'>
                <img className='lg:w-48 lg:h-48 w-36 h-36  rounded-md' src={prop.img} />
                <div className='flex flex-col lg:mx-4 mx-2 w-full'>
                    <div className='w-full flex lg:justify-between flex-col lg:flex-row font-bold text-xl'>
                        <span>{prop.name}</span>
                        <span className='lg:text-right'>{prop.price.toLocaleString()}</span>
                    </div>
                    <span className='font-semibold text-gray-600'>Số lượng:{quantity}</span>
                    <div className='items-center flex lg:w-2/12 w-8/12 lg:h-20 mt-4 border rounded-2xl border-gray-950 text-center'>
                        <button className='w-1/3' onClick={() => decrease()}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className='w-1/3'>{quantity}</span>
                        <button className='w-1/3' onClick={() => increase()}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    <div className='w-full lg:flex justify-end h-full items-end hidden'>
                        <button onClick={() => { remove() }}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem