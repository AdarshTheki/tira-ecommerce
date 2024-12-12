import React from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { Inputs } from '../utils';
import { useLoginMutation } from '../redux/apiSlice';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [passwordShow, setPasswordShow] = React.useState(false);
    const [login, { isLoading }] = useLoginMutation();

    const submitForm = async (userData) => {
        const user = await login(userData);
        if (user.data) {
            toast.success('user login successfully');
            localStorage.setItem('token', user.data.accessToken);
            window.location.href = '/';
        } else if (user.error) {
            toast.error(
                'Invalid username or password. Please check your credentials and try again.'
            );
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen px-4'>
            <div className='sm:grid grid-cols-2 items-center bg-white shadow-lg rounded-2xl'>
                <div className='sm:block hidden'>
                    <img
                        src='/login.jpg'
                        alt='login'
                        className='rounded-l-2xl max-h-[80vh] w-full object-cover'
                    />
                </div>
                <div className='p-10'>
                    <h2 className='text-2xl font-extrabold mb-8'>Sign In</h2>
                    <form onSubmit={handleSubmit(submitForm)} className='space-y-6 w-full'>
                        <Inputs
                            label='Email:'
                            type='email'
                            placeholder='demouser@gmail.com'
                            {...register('email', {
                                required: true,
                            })}
                        />
                        <div className='relative'>
                            <Inputs
                                label='Password:'
                                type={passwordShow ? 'text' : 'password'}
                                placeholder='demouser@12'
                                {...register('password', {
                                    required: true,
                                })}
                            />
                            <span
                                onClick={() => setPasswordShow(!passwordShow)}
                                className='absolute right-5 top-9 text-xl rounded cursor-pointer hover:opacity-90'>
                                {passwordShow ? <EyeOff /> : <Eye />}
                            </span>
                        </div>
                        <NavLink
                            className='cursor-pointer hover:text-blue-800 text-blue-600'
                            to='/forgot-password'>
                            Change password
                        </NavLink>
                        <Inputs
                            type='submit'
                            value={isLoading ? 'Loading...' : 'Login to your account'}
                            className='!bg-gray-800  !text-white font-medium cursor-pointer'
                        />
                        <p className='space-x-2'>
                            <span>Not registered?</span>
                            <NavLink to={'/register'} className='text-blue-600 hover:text-blue-800'>
                                Sign Up
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
