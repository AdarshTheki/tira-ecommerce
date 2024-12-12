import React, { useMemo } from 'react';
import Cart from '../components/Cart/Cart';
import Checkout from '../components/Cart/Checkout';
import { useSelector } from 'react-redux';
import ProductEmpty from '../components/Product/ProductEmpty';

const CartPage = () => {
    const { items } = useSelector((state) => state.cart);

    const cart = useMemo(() => items?.filter((item) => item.flag), [items]);

    const filterCart = useMemo(() => items?.filter((item) => !item.flag), [items]);

    const totals = useMemo(
        () => cart?.reduce((prev, curr) => prev + curr?.price * curr?.quantity, 0),
        [cart]
    );

    if (!items || items.length === 0)
        return <ProductEmpty message='Your cart is empty' to='/category/mens-shoes' />;

    return (
        <div className='min-h-screen'>
            <Cart carts={cart} saveItems={filterCart} />
            <Checkout carts={cart} totals={totals} />
        </div>
    );
};

export default CartPage;
