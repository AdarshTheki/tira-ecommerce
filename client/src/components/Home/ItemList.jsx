/* eslint-disable react/prop-types */
import { ProductItem } from '../index';
import { useProductsQuery } from '../../redux/apiSlice';
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

const ItemList = ({ name = '', category = '' }) => {
    const { data, isLoading } = useProductsQuery({ category: category });

    if (!data || isLoading || !data?.docs.length) {
        return (
            <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 container mx-auto'>
                {Array.from({ length: 5 }, (i, index) => (
                    <p key={index}>
                        <Box />
                    </p>
                ))}
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-4 items-center justify-center mt-10'>
            <h2 className='uppercase sm:text-3xl text-xl font-semibold'>{name}</h2>
            <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 container mx-auto'>
                {data?.docs?.map((item) => (
                    <div key={item._id} className=''>
                        <ProductItem {...item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;
