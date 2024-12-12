import React from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';

import { useHandleDeleteReviewMutation } from '../../redux/apiSlice';
import { StarRating } from '../../utils';

export default function ReviewItem({ ...rest }) {
    const { _id, userId, rating, comment, date } = rest;
    const { user } = useSelector((state) => state.auth);
    const [handleDeleteReview, { isLoading }] = useHandleDeleteReviewMutation();

    async function handleDelete() {
        const res = await handleDeleteReview(_id);
        if (res.data) {
            toast.success('review item deleted');
        } else if (res.error) {
            toast.error('review item not deleted properly');
        }
    }

    return (
        <div className='p-2 bg-white flex gap-4 items-start border rounded-lg'>
            <h2 className='flex items-center text-center font-semibold bg-gray-300 justify-center uppercase border rounded-full h-10 w-12'>
                {userId?.username?.slice(0, 1)}
            </h2>
            <div className='w-full relative'>
                <h2 className='capitalize font-medium'>{userId.username}</h2>
                {user?._id === userId?._id && (
                    <div tabIndex={20} className='absolute group right-0 top-0 focus:outline-none'>
                        <EllipsisVertical />
                        <div className='group-hover:grid shadow-lg group-focus:grid hidden text-base top-0 right-0 rounded-lg border absolute bg-white'>
                            <NavLink to={`/review/${_id}`} className='py-2 px-3 hover:bg-gray-200'>
                                Edit
                            </NavLink>
                            <button onClick={handleDelete} className='py-2 px-3 hover:bg-gray-200'>
                                {isLoading ? 'Loading...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                )}
                <StarRating rating={rating} />
                <p className=' text-gray-500 my-2 font-medium line-clamp-3'>{comment}</p>
                <p className='text-sm'>{new Date(date)?.toDateString()}</p>
            </div>
        </div>
    );
}
