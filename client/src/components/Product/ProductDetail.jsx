/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { addItem } from '../../redux/cartSlice';
import { StarRating, formatPrice } from '../../utils';

const Container = ({
    title,
    category,
    brand,
    discount,
    price,
    description,
    rating,
    stock,
    thumbnail,
    images,
    _id,
    colors = ['#000', '#ffd966', '#800080', '#13dac6'],
}) => {
    const [image, setImage] = React.useState('');
    const [color, setColor] = React.useState(colors[0]);
    const dispatch = useDispatch();

    return (
        <div className='sm:grid grid-cols-2 gap-10 mt-5 items-start'>
            {/* Product Image Gallery */}
            <div className='flex sm:flex-row flex-col-reverse items-center sm:items-start gap-2'>
                <div className='flex sm:flex-col gap-2'>
                    {images?.map((pic, index) => (
                        <img
                            key={index}
                            onMouseOver={() => setImage(pic)}
                            src={pic}
                            className='border w-full h-24 overflow-hidden cursor-pointer rounded-lg bg-center'
                        />
                    ))}
                </div>
                <div className='overflow-hidden max-w-[400px] max-h-[350px] border'>
                    <img
                        src={image || thumbnail}
                        alt={title}
                        className='object-contain mx-auto w-full'
                    />
                </div>
            </div>
            {/* Product Descriptions */}
            <div className='capitalize space-y-5'>
                <section>
                    <p>{category}</p>
                    <h2 className='text-xl md:text-3xl font-bold'>{title}</h2>
                    <StarRating rating={rating} size={20} />
                </section>
                <h2 className='space-x-2 font-bold'>
                    <span className='text-3xl text-gray-700'>{formatPrice(price)}</span>
                    <span className='text-red-400'>{discount}%</span>
                </h2>
                <p>{description}</p>
                <p>Choose Color:</p>
                {colors.map((c) => (
                    <button
                        key={c}
                        style={{ background: `${c}` }}
                        onClick={() => setColor(c)}
                        className={`rounded-full mr-4 outline ring-offset-3 w-6 h-6 ${
                            color === c ? ' outline-blue-600' : ' outline-transparent'
                        }`}></button>
                ))}
                <button
                    className='py-2 px-5 border rounded-lg hover:border-blue-600 text-blue-600 flex items-center gap-4 font-medium'
                    onClick={() => {
                        dispatch(addItem({ _id, thumbnail, discount, brand, title, price }));
                        toast.success('Success! The Item has been Added to Your Cart.');
                    }}>
                    <ShoppingBag />
                    Add To Cart
                </button>
            </div>
        </div>
    );
};
export default Container;
