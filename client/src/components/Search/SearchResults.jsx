import React from 'react';
import { NavLink } from 'react-router-dom';
import { LazyImage } from '../../utils';
import { useProductsQuery } from '../../redux/apiSlice';

export default function SearchResults({ query = '' }) {
    const { data } = useProductsQuery({ search: query });

    return (
        <div className='sm:px-5'>
            <p className='font-semibold text-lg m-2'>
                {query !== '' ? `Searching result is "${query}"` : 'Top searching products'}
            </p>
            {data &&
                data?.docs?.map((item) => (
                    <NavLink
                        to={`/product/${item._id}`}
                        key={item._id}
                        className='py-1 px-5 hover:bg-gray-200 flex items-center gap-2 border-b'>
                        <LazyImage src={item.thumbnail} alt={item.title} className='max-w-[40px]' />
                        <span className='text-sm'>{item.title}</span>
                    </NavLink>
                ))}
        </div>
    );
}
