import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductDetail, ProductList, ProductEmpty, ReviewList, ReviewForm } from '../components';

const ProductSingle = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/products/id/${id}`);
                if (!res.ok) {
                    throw Error('something was wrong?');
                }
                const product = await res.json();
                setData(product);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);

    if (!data) return <ProductEmpty />;

    return (
        <div className='max-w-screen-lg mx-auto p-2'>
            <ProductDetail {...data?.product} />
            <hr className='border-b my-10' />
            <ReviewList reviews={data?.reviews} />
            <hr className='border-b my-10' />
            <ReviewForm id={id} />
            <hr className='border-b my-10' />
            <ProductList products={data?.related} name='You might also like' />
        </div>
    );
};

export default ProductSingle;
