import React from 'react';
import ReviewItem from './ReviewItem';

export default function ReviewLists({ reviews }) {
    return reviews?.length ? (
        <>
            <p className='font-medium py-3'>Explore customers ratings & reviews</p>
            <div className='grid sm:grid-cols-2 gap-3'>
                {reviews?.map((item) => (
                    <ReviewItem key={item._id} {...item} />
                ))}
            </div>
        </>
    ) : (
        <h2 className='py-10 capitalize text-center'>
            This product not have any reviews! Cay you create the review ?
        </h2>
    );
}
