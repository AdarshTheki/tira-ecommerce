/* eslint-disable react/prop-types */
import React from 'react';
import { useCheckoutMutation } from '../../redux/apiSlice';
import { removeItem } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../../utils';

const CheckoutComponents = ({ carts, totals }) => {
    const [checkout, { isLoading }] = useCheckoutMutation();
    const dispatch = useDispatch();

    const checkoutHandler = async () => {
        const res = await checkout({ cartItems: carts });
        if (res.data) {
            carts?.map((item) => dispatch(removeItem(item._id)));
            window.location.href = res.data;
        }
    };

    if (!carts || carts?.length === 0) return null;

    return (
        <div className='p-5'>
            <p className='text-xl font-medium'>Order Summary</p>
            <p className='text-gray-400'>
                Check your items. And select a suitable shipping method.
            </p>
            <div className='mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6'>
                {carts?.map((item) => (
                    <div key={item._id} className='flex flex-col rounded-lg bg-white sm:flex-row'>
                        <img
                            className='m-2 h-24 w-28 rounded-md border object-cover object-center'
                            src={
                                item?.thumbnail ||
                                'https://dummyjson.com/image/400x300/aaaaaa/ffffff?text=Not+Found'
                            }
                            alt={item.title}
                        />
                        <div className='flex w-full flex-col px-4 py-4'>
                            <span className='font-semibold'>{item.title}</span>
                            <span className='float-right text-gray-400'>
                                {item.discount}% Discount
                            </span>
                            <span className='float-right text-gray-400'>Brand: {item.brand}</span>
                            <p className='text-lg font-bold text-gray-800'>
                                {formatPrice(item?.price)} X {item.quantity} =
                                {formatPrice(item?.price * item?.quantity)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='relative'>
                {/* <!-- Total --> */}
                <div className='mt-6 border-t border-b py-2'>
                    <div className='flex items-center justify-between'>
                        <p className='font-medium text-gray-900'>Subtotal</p>
                        <p className='font-semibold text-gray-900'>{formatPrice(totals)}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='font-medium text-gray-900'>Shipping</p>
                        <p className='font-semibold text-gray-900'>-{formatPrice(20)}</p>
                    </div>
                </div>
                <div className='mt-6 flex items-center justify-between'>
                    <p className='font-medium text-gray-900'>Total</p>
                    <p className='text-2xl font-semibold text-gray-900'>
                        {formatPrice(totals + 20)}
                    </p>
                </div>
            </div>
            <button
                onClick={checkoutHandler}
                className='mt-4 mb-8 w-full rounded-md bg-gray-900 hover:bg-gray-800 px-6 py-3 font-medium text-white'>
                {isLoading ? 'Loading...' : 'Place Order'}
            </button>
        </div>
    );
};

export default CheckoutComponents;
