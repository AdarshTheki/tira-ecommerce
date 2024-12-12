import React from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

import { Inputs } from '../utils';
import { useSignInMutation } from '../redux/apiSlice';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [passwordShow, setPasswordShow] = React.useState(false);
    const [signIn, { isLoading }] = useSignInMutation();

    const submitForm = async (userData) => {
        const res = await signIn(userData);
        if (res.data) {
            toast.success('user successfully register');
            navigate('/login');
        } else if (res.error) {
            toast.error('Invalid email or password. Please check your credentials and try again.');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen px-4'>
            <div className='sm:grid grid-cols-2 items-center bg-white shadow-lg rounded-2xl'>
                <div className='sm:block hidden'>
                    <img
                        src='/register.jpg'
                        alt='login'
                        className='rounded-l-2xl max-h-[90vh] w-full object-cover'
                    />
                </div>
                <div className='p-10'>
                    <h2 className='text-2xl font-extrabold mb-5'>Create a Free Account</h2>
                    <form onSubmit={handleSubmit(submitForm)} className='space-y-4 w-full'>
                        <Inputs
                            label='Username'
                            placeholder='company name'
                            {...register('username', {
                                required: true,
                            })}
                        />
                        <Inputs
                            label='Email:'
                            type='email'
                            placeholder='name@company.com'
                            {...register('email', {
                                required: true,
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                            })}
                        />
                        <div className='relative'>
                            <Inputs
                                label='Password:'
                                type={passwordShow ? 'text' : 'password'}
                                placeholder='● ● ● ● ● ● ●'
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
                        <Inputs
                            type='submit'
                            value={isLoading ? 'Loading...' : 'Register'}
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
