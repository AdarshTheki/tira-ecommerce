/* eslint-disable react/prop-types */
import React from 'react';
import CartItem from './CartItem';

const CartPage = ({ carts, saveItems }) => {
    return (
        <div className='p-5'>
            {/* Cart Item */}

            {carts?.length ? (
                <div className='grid gap-5'>
                    <h2 className='capitalize font-semibold text-xl sm:text-3xl'>
                        save Cart ( {carts?.length} item )
                    </h2>
                    <div className='grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
                        {carts?.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </div>
                </div>
            ) : (
                <h2 className='text-center text-xl flex items-center justify-center w-full h-[200px]'>
                    Your Product is Empty
                </h2>
            )}

            {/* Save Latter */}
            {saveItems?.length ? (
                <>
                    <hr className='border my-10' />
                    <h2 className='capitalize font-semibold text-xl sm:text-3xl pb-3'>
                        save Latter ( {saveItems?.length} item )
                    </h2>
                    <div className='grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
                        {saveItems?.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default CartPage;
