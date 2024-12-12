import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { Inputs } from '../utils';

const Register = () => {
    const { register, handleSubmit } = useForm();

    return (
        <div className='flex items-center justify-center min-h-screen px-4'>
            <div className='sm:grid grid-cols-2 items-center bg-white shadow-lg rounded-2xl'>
                <div className='sm:block hidden'>
                    <img
                        src='/password.jpg'
                        alt='login'
                        className='rounded-l-2xl max-h-[90vh] w-full object-cover'
                    />
                </div>
                <div className='p-10'>
                    <h2 className='text-2xl font-extrabold mb-5'>Reset your password</h2>
                    <form onSubmit={handleSubmit()} className='space-y-4 w-full'>
                        <Inputs
                            label='Email:'
                            type='email'
                            placeholder='name@company.com'
                            {...register('email', {
                                required: true,
                            })}
                        />
                        <Inputs
                            label='Old Password:'
                            type='password'
                            placeholder='●●●●●●●'
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <Inputs
                            label='New Password:'
                            type='password'
                            placeholder='●●●●●●●'
                            {...register('newPassword', {
                                required: true,
                            })}
                        />
                        <Inputs
                            type='submit'
                            value='Reset Password'
                            className='!bg-gray-800 my-3 !text-white font-medium cursor-pointer'
                        />
                        <p>
                            <span>Already have an account?</span>
                            <NavLink
                                to={'/login'}
                                className='text-center ml-2 hover:text-blue-800 text-blue-800'>
                                Sign In
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
