import React, { useState } from 'react';
import {
    ChevronDown,
    ChevronUp,
    Contact,
    FileClock,
    Heart,
    Home,
    ShoppingBag,
    ShoppingCart,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { categories } from '../../utils';

const LeftBar = () => {
    const [category, setCategory] = useState(false);

    return (
        <div className='hidden sm:block h-screen gutter overflow-y-auto min-w-[200px] max-w-[250px] p-5 border-r'>
            <ul className='grid gap-5 items-center justify-center capitalize w-full font-medium text-gray-700'>
                <NavLink to={'/'} className='flex items-center gap-2 hover:text-blue-600'>
                    <Home size={18} />
                    Home
                </NavLink>
                <div>
                    <p
                        onClick={() => setCategory(!category)}
                        className='flex items-center gap-2 hover:text-blue-600 cursor-pointer'>
                        <ShoppingBag size={18} />
                        Category
                        {!category ? <ChevronDown /> : <ChevronUp />}
                    </p>
                    {category && (
                        <div className='grid gap-2 pl-6 my-2'>
                            {categories.map((item) => (
                                <NavLink
                                    key={item}
                                    to={`/category/${item}`}
                                    className='hover:text-blue-600'>
                                    {item.split('-')[1] ? item.split('-')[1] : item.split('-')[0]}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
                <NavLink to='/cart' className='flex items-center gap-2 hover:text-blue-600'>
                    <ShoppingCart size={18} />
                    my Cart
                </NavLink>
                <NavLink to='/wishlist' className='flex items-center gap-2 hover:text-blue-600'>
                    <Heart size={18} />
                    wishlist
                </NavLink>
                <NavLink
                    to='/order/history'
                    className='flex items-center gap-2 hover:text-blue-600'>
                    <FileClock size={18} />
                    orders
                </NavLink>
                <NavLink to='/contact' className='flex items-center gap-2 hover:text-blue-600'>
                    <Contact size={18} />
                    Contact
                </NavLink>
            </ul>
        </div>
    );
};

export default LeftBar;
