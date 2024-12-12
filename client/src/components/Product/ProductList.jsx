/* eslint-disable react/prop-types */
import ProductItem from './ProductItem';
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

export default function ProductList({ checkStatus = false, name = 'Products', products = [] }) {
    if (!products || checkStatus || !products?.length) {
        return (
            <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 container mx-auto'>
                {Array.from({ length: 15 }, (i, index) => (
                    <p key={index}>
                        <Box />
                    </p>
                ))}
            </div>
        );
    }

    return (
        <div className='container py-10 mx-auto'>
            <h2 className='capitalize text-2xl font-semibold mb-4'>
                Our {name?.replace('-', ' ')}
            </h2>
            <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5'>
                {products?.map((product) => (
                    <ProductItem {...product} key={product._id} />
                ))}
            </div>
        </div>
    );
}
