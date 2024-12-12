import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { ProductList } from '../components';
import { useProductsQuery } from '../redux/apiSlice';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Box = () => {
    return (
        <>
            <SkeletonTheme>
                <Skeleton count={1} height={200} width='100%' />
                <Skeleton count={1} height={12} width={50} />
                <Skeleton count={1} height={15} width='80%' />
                <Skeleton count={1} height={10} width='60%' />
                <Skeleton count={1} height={10} width='100%' />
            </SkeletonTheme>
        </>
    );
};

const ProductListing = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const brand = searchParams.get('brand');

    const { data, isLoading } = useProductsQuery({
        category: category || '',
        brand: brand || '',
        search: search || '',
    });

    console.log(data);

    if (!data || isLoading || !data?.docs?.length) {
        return (
            <div className='grid py-10 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 container mx-auto'>
                {Array.from({ length: 20 }, (i, index) => (
                    <p key={index}>
                        <Box />
                    </p>
                ))}
            </div>
        );
    }

    return <ProductList checkStatus={isLoading} products={data?.docs} name={category} />;
};

export default ProductListing;
