import { Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useHandleAddReviewMutation } from '../../redux/apiSlice';
import { useHandleUpdateReviewMutation } from '../../redux/apiSlice';

export default function ReviewForm({ id, ...item }) {
    const [data, setData] = useState({
        rating: item?.rating || null,
        comment: item?.comment || '',
    });
    const navigate = useNavigate();

    const [handleAddReview, { isLoading }] = useHandleAddReviewMutation();
    const [handleUpdateReview, { isLoading: updating }] = useHandleUpdateReviewMutation();

    const handleSubmit = async () => {
        const { comment, rating } = data;
        if (!item?._id) {
            // create new review with productId
            const res = await handleAddReview({ productId: id, comment, rating });
            if (res.data) {
                toast.success('review created');
                navigate(`/product/${id}`);
            } else if (res.error) {
                toast.error('review not created');
            }
        } else {
            // update review with reviewId
            const res = await handleUpdateReview({ reviewId: item?._id, comment, rating });
            if (res.data) {
                toast.success('review updated');
                navigate(`/product/${item?.productId}`);
            } else if (res.error) {
                toast.error('review not updated');
            }
        }
        setData({ comment: '', rating: 0 });
    };

    const StarRating = () => {
        return (
            <div className='flex items-center gap-2'>
                {[...Array(5)].map((_, index) => {
                    index += 1;
                    return (
                        <Star
                            className='cursor-pointer duration-150 ease-out'
                            key={index}
                            fill={index <= data.rating ? '#FFA534' : '#FFF'}
                            color='#FFA534'
                            onClick={() => setData({ ...data, rating: index })}
                            size={24}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className='flex flex-col w-full gap-5 items-center justify-between p-10 max-w-screen-sm mx-auto'>
            <p className='text-xl font-bold text-gray-600'>Write and Review Products</p>
            <StarRating />
            <textarea
                required={true}
                minLength={10}
                maxLength={300}
                onChange={(e) => setData({ ...data, comment: e.target.value })}
                value={data.comment}
                id='comment'
                rows='4'
                className='w-full p-5 rounded-lg shadow border'
                placeholder='Write your thoughts here...'></textarea>
            <p>Text limit: {data?.comment?.trim()?.length} / 300</p>
            <div className='flex w-full gap-4'>
                <button
                    onClick={handleSubmit}
                    className='w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-opacity-80'>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
                <button
                    onClick={() => navigate(id ? `/product/${id}` : `/product/${item?.productId}`)}
                    className='w-full py-2 bg-red-700 text-white rounded-lg hover:bg-opacity-80'>
                    {updating ? 'Loading...' : 'Close'}
                </button>
            </div>
        </div>
    );
}
