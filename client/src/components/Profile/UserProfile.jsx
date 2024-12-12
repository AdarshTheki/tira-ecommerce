import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Inputs } from '../../utils';

export default function UserProfile() {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className='max-w-screen-lg mx-auto space-y-4'>
            <div className='p-4 bg-white shadow'>
                <ChangeCoverImage {...user} />
            </div>
            <div className='p-4 bg-white shadow'>
                <ChangeUserName {...user} />
            </div>
            <div className='p-4 bg-white shadow'>
                <ChangeUserEmail {...user} />
            </div>
        </div>
    );
}

function ChangeCoverImage({ avatar }) {
    const [loading, setLoading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState(avatar);
    const [selectFile, setSelectFile] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!selectFile) return toast.error('please select avatar image');
        if (selectFile) {
            const formData = new FormData();
            formData.append('avatar', selectFile);
            setLoading(true);
            try {
                const res = await fetch(import.meta.env.VITE_BASE_URL + '/auth/avatar', {
                    method: 'PATCH',
                    headers: {
                        ContentType: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: formData,
                });
                if (!res.ok) {
                    throw new Error('Avatar not uploaded properly');
                }
                const { user } = await res.json();
                setUploadedUrl(user.avatar);
                const localData = JSON.parse(localStorage.getItem('user')) || {};
                localStorage.setItem('user', JSON.stringify({ ...localData, avatar: user.avatar }));
                toast.success('Avatar successfully uploaded');
            } catch (error) {
                toast.error('something was wrong');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <form onSubmit={onSubmit} className='w-full'>
            <img
                src={uploadedUrl || '/user_not_found.png'}
                alt='avatar'
                className='object-cover rounded-full w-[100px] h-[100px]'
            />
            <input
                type='file'
                accept='.png, .jpg, .jpeg'
                name='avatar'
                className='border p-2 rounded-lg my-4 cursor-pointer w-full'
                onChange={(e) => setSelectFile(e.target.files[0])}
            />
            <button type='submit' className='p-2 text-blue-700 font-semibold'>
                {loading ? 'Uploading...' : 'Change avatar'}
            </button>
        </form>
    );
}

function ChangeUserName({ username }) {
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const { handleSubmit, register, reset } = useForm();

    function onSubmit(data) {
        setLoading(true);
        setTimeout(() => {
            const user = JSON.parse(localStorage.getItem('user')) || {};
            localStorage.setItem('user', JSON.stringify({ ...user, ...data }));
            setEdit(false);
            reset();
            setLoading(false);
        }, 1000);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            {edit ? (
                <div className='grid'>
                    <Inputs
                        placeholder='enter username...'
                        label='username'
                        {...register('username', {
                            required: true,
                        })}
                    />
                    <div>
                        <button type='submit' className='text-blue-700 p-2 font-semibold'>
                            {loading ? 'Loading...' : 'Update'}
                        </button>
                        <button
                            onClick={() => {
                                setEdit(false);
                                reset();
                            }}
                            type='button'
                            className='text-red-700 font-semibold p-2'>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className='grid'>
                    <Inputs
                        placeholder={username}
                        readOnly={true}
                        className='cursor-not-allowed'
                        label='username'
                        {...register('username')}
                    />
                    <p
                        onClick={() => setEdit(true)}
                        className='p-2 cursor-pointer text-blue-700 font-semibold'>
                        Edit
                    </p>
                </div>
            )}
        </form>
    );
}

function ChangeUserEmail({ email }) {
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const { handleSubmit, register, reset } = useForm();

    function onSubmit(data) {
        setLoading(true);
        setTimeout(() => {
            const user = JSON.parse(localStorage.getItem('user')) || {};
            localStorage.setItem('user', JSON.stringify({ ...user, ...data }));
            setEdit(false);
            reset();
            setLoading(false);
        }, 1000);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            {edit ? (
                <div className='grid'>
                    <Inputs
                        placeholder='enter email...'
                        label='email'
                        type='email'
                        {...register('email', {
                            required: true,
                        })}
                    />
                    <div>
                        <button type='submit' className='text-blue-700 p-2 font-semibold'>
                            {loading ? 'Loading...' : 'Update'}
                        </button>
                        <button
                            onClick={() => {
                                setEdit(false);
                                reset();
                            }}
                            type='button'
                            className='text-red-700 p-2 font-semibold'>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className='grid'>
                    <Inputs
                        placeholder={email}
                        readOnly={true}
                        className='cursor-not-allowed'
                        label='email'
                        {...register('email')}
                    />
                    <p
                        onClick={() => setEdit(true)}
                        className='p-2 cursor-pointer text-blue-700 font-semibold'>
                        Edit
                    </p>
                </div>
            )}
        </form>
    );
}
