import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

import SearchBart from '../Search/SearchBar';
import { setLogout } from '../../redux/authSlice';
import { categories } from '../../utils';
import {
    ChevronDown,
    ChevronUp,
    Contact,
    FileClock,
    Heart,
    Home,
    Menu,
    ShoppingBag,
    ShoppingCart,
    UserRound,
} from 'lucide-react';

const Header = () => {
    return (
        <div className='sticky bg-white w-full top-0 z-40 shadow'>
            <h4 className='text-right'>
                <NavLink className='text-sm pt-1 hover:opacity-70' to='/'>
                    Track Order &ensp;|&ensp;
                </NavLink>
                <NavLink className='text-sm pr-10 hover:opacity-70' to='/'>
                    Help Center
                </NavLink>
            </h4>
            <div className='container mt-2 mx-auto flex items-start justify-between'>
                {/* Logo */}
                <div className='flex items-start gap-5 lg:gap-12 md:gap-8'>
                    <NavLink to='/' className='text-4xl font-thin text-rose-600'>
                        <h3>Tira</h3>
                    </NavLink>

                    {/* brands */}
                    <ul className='flex font-light items-center justify-between gap-5 lg:gap-12 md:gap-8 capitalize'>
                        {['brand', 'offers', 'top seals', 'category'].map((i) => (
                            <NavLink
                                to={i}
                                key={i}
                                className='hover:text-rose-600 border-b pb-5 border-b-transparent hover:border-b-rose-600 capitalize'>
                                {i}
                            </NavLink>
                        ))}
                    </ul>
                </div>
                <div className='flex items-center gap-5 lg:gap-12 md:gap-8'>
                    {/* Search Bar */}
                    <SearchBart />

                    {/* User */}
                    <div className='flex items-center justify-center gap-5'>
                        <NavLink to={'/user'}>
                            <UserRound />
                        </NavLink>
                        <NavLink to={'/cart'}>
                            <ShoppingCart />
                        </NavLink>
                    </div>
                </div>
            </div>
            <hr />
            <div className='flex justify-start overflow-hidden md:gap-5 gap-2 container mx-auto pt-3'>
                {categories?.map((i) => (
                    <NavLink
                        to={`/products?category=${i}`}
                        key={i}
                        className='hover:text-rose-600 border-b pb-3 border-b-transparent hover:border-b-rose-600 capitalize'>
                        {i.split('-')[1] || i.split('-')[0]}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Header;

const LoginUser = () => {
    const { user } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const logoutHandler = async () => {
        dispatch(setLogout());
        toast.success('user has been logout');
    };

    const toggle = () => setOpen(!open);

    return (
        <div className='relative' ref={dropdownRef}>
            <img
                src={'/user.png'}
                width={40}
                alt='user logo'
                className='cursor-pointer'
                onClick={toggle}
            />

            {open && (
                <div className='z-20 absolute grid top-14 right-0 w-[150px] rounded shadow-lg bg-white h-fit'>
                    {user?.email && (
                        <NavLink
                            className='hover:text-blue-600 px-4 py-2 hover:bg-gray-100'
                            to='/user/profile'>
                            Users
                        </NavLink>
                    )}
                    <NavLink
                        className='hover:text-blue-600 px-4 py-2 hover:bg-gray-100'
                        to='/user/information'>
                        Information
                    </NavLink>
                    <NavLink
                        className='hover:text-blue-600 px-4 py-2 hover:bg-gray-100'
                        to='/user/password'>
                        Password
                    </NavLink>
                    <NavLink
                        className='hover:text-blue-600 px-4 py-2 hover:bg-gray-100'
                        to='/user/about'>
                        About Me
                    </NavLink>
                    {user?.email ? (
                        <NavLink
                            onClick={logoutHandler}
                            className='text-red-700 px-4 py-2 border-t hover:bg-gray-100'>
                            Logout
                        </NavLink>
                    ) : (
                        <NavLink
                            to='/login'
                            className='hover:text-blue-600 px-4 py-2 border-t hover:bg-gray-100'>
                            Login
                        </NavLink>
                    )}
                </div>
            )}
        </div>
    );
};

const MenuItems = () => {
    const [category, setCategory] = useState(false);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='block sm:hidden relative' ref={dropdownRef}>
            <Menu onClick={() => setOpen(!open)} className='cursor-pointer hover:text-blue-700' />
            {open && (
                <ul className='z-20 py-4 px-6 overflow-y-auto gutter max-h-[85vh] absolute grid rounded gap-4 top-12 right-0 w-fit shadow-lg bg-white h-fit'>
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
                                        {item.split('-')[1]
                                            ? item.split('-')[1]
                                            : item.split('-')[0]}
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
            )}
        </div>
    );
};
