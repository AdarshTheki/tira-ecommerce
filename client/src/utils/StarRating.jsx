import React from 'react';
import { Star, StarHalf } from 'lucide-react';

// StarRating component
const StarRating = ({ limit = 5, rating = 4.5, size = 16 }) => {
    const StarPrint = ({ type }) => {
        let fillColor = '#facc15'; // Filled star color

        if (type === 'full') {
            return <Star fill={fillColor} color={fillColor} size={size} />;
        } else if (type === 'half') {
            return <StarHalf fill={fillColor} color={fillColor} size={size} />;
        }

        return <Star fill='none' color={fillColor} size={size} />;
    };

    return (
        <p className='flex gap-1 items-center'>
            {[...Array(limit)].map((_, index) => {
                const starType =
                    index < Math.floor(rating) ? 'full' : index < rating ? 'half' : 'empty';
                return <StarPrint key={index} type={starType} />;
            })}
        </p>
    );
};

export default StarRating;
