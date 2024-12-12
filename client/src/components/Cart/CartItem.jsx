/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { CircleMinus, CirclePlus, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import {
    decreaseQuantity,
    increaseQuantity,
    moveToCart,
    removeItem,
    updateItemQuantity,
} from '../../redux/cartSlice';
import { Button } from '../../utils';
import { ProductItem } from '../index';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <div key={item._id} className='relative'>
            <button
                onClick={() => dispatch(removeItem(item._id))}
                className='absolute z-10 top-3 left-5 p-2 rounded-lg bg-red-600 font-semibold'>
                <Trash2 color='#fff' />
            </button>
            <ProductItem {...item} />
            {item.flag ? (
                <div className='sm:flex justify-between items-center px-4 py-2'>
                    <p className='font-medium'>Quantity: {item.quantity}</p>
                    <div className='flex items-center gap-1'>
                        <button onClick={() => dispatch(increaseQuantity(item._id))}>
                            <CirclePlus fill='#fff' color='#111' />
                        </button>
                        <input
                            type='text'
                            value={item.quantity}
                            onChange={(e) => {
                                let value = Number(e.target.value);
                                dispatch(
                                    updateItemQuantity({
                                        _id: item._id,
                                        quantity: isNaN(value) ? 1 : value,
                                    })
                                );
                            }}
                            className='w-10 rounded border border-gray-400 px-1 font-semibold text-center'
                        />
                        <button onClick={() => dispatch(decreaseQuantity(item._id))}>
                            <CircleMinus fill='#fff' color='#111' />
                        </button>
                    </div>
                </div>
            ) : null}
            <Button
                leftIcon={!item.flag ? <ShoppingBag /> : <Heart />}
                className='bg-gray-200 mt-2 hover:bg-gray-300 w-full justify-center mx-auto'
                onClick={() => dispatch(moveToCart(item._id))}>
                {!item.flag ? 'Move to cart' : 'Save for latter'}
            </Button>
        </div>
    );
};

export default CartItem;
