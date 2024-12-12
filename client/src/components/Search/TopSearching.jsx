import React from 'react';
import { NavLink } from 'react-router-dom';
import ProductEmpty from '../Product/ProductEmpty';
import { useProductsQuery } from '../../redux/apiSlice';
import { formatPrice, LazyImage } from '../../utils';

const TopSearching = () => {
    const { data, isLoading } = useProductsQuery({ sortBy: 'rating' });

    if (isLoading || !data) return <ProductEmpty />;

    return (
        <div className='sm:p-5'>
            <h2 className='font-semibold text-lg my-2'>Top Products</h2>
            <div className='flex w-full flex-wrap justify-between gap-2'>
                {data?.products.map((item) => (
                    <NavLink
                        to={`/product/${item._id}`}
                        key={item._id}
                        className='grid min-w-[100px] flex-1 text-sm p-2 border rounded'>
                        <LazyImage
                            src={item.images[0]}
                            alt={item.title}
                            className='max-w-[100px]'
                        />
                        <p className='line-clamp-1'>{item.title}</p>
                        <p>{formatPrice(item.price)}</p>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default TopSearching;
