import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='mx-auto max-w-screen-sm p-10 flex items-center justify-center flex-col'>
            <img src='/404.svg' alt='404 svg' className='w-full max-h-[70vh]' />
            <div className='text-center space-y-4'>
                <h2 className='text-2xl font-semibold text-gray-700'>Page not found</h2>
                <p className='text-lg text-gray-500'>
                    Oops! Looks like you followed a bad link. If you think this is a problem with
                    us, please tell us. Go back home
                </p>
                <NavLink
                    to={'/'}
                    className='rounded-lg text-sm block w-fit mx-auto bg-blue-600 hover:bg-blue-800 font-semibold text-white py-2 px-5'>
                    Go back home
                </NavLink>
            </div>
        </div>
    );
}
