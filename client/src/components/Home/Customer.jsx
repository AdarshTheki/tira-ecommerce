import React from 'react';
import { StarRating } from '../../utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetReviewsQuery } from '../../redux/apiSlice';
import { NavLink } from 'react-router-dom';

const Customer = () => {
    const { data } = useGetReviewsQuery();
    const containerRef = React.useRef(null);

    const sideScroll = React.useCallback((direction) => {
        const scrollAmount = direction === 'left' ? -600 : 600;
        containerRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className='relative'>
            <div className='sm:flex mb-4 justify-between items-center'>
                <h2
                    className='uppercase sm:text-3xl text-xl font-semibold'
                    style={{ fontWeight: 900 }}>
                    OUR HAPPY CUSTOMERS
                </h2>
                <div className='flex gap-2'>
                    <button
                        onClick={() => sideScroll('left')}
                        className='bg-gray-800 hover:bg-gray-900 text-white p-1.5 flex items-center rounded-full h-8 w-8'>
                        <ChevronLeft fontSize={20} />
                    </button>
                    <button
                        onClick={() => sideScroll('right')}
                        className='bg-gray-800 hover:bg-gray-900 text-white p-1.5 flex items-center rounded-full h-8 w-8'>
                        <ChevronRight fontSize={20} />
                    </button>
                </div>
            </div>
            <div className='flex overflow-x-auto' ref={containerRef}>
                {data?.length
                    ? data.map((item) => (
                          <NavLink
                              to={`/product/${item?.productId}`}
                              key={item._id}
                              className='min-w-[260px] grid p-4 mr-2 bg-white m-2 rounded-lg hover:scale-95 duration-300'>
                              <p className='text-xl font-semibold capitalize'>
                                  {item?.userId?.username || 'Demo User'}
                              </p>
                              <StarRating rating={item?.rating || 2} />
                              <p className=' line-clamp-3'>{item.comment}</p>
                              <p className='text-sm mt-2'>{new Date(item?.date).toDateString()}</p>
                          </NavLink>
                      ))
                    : [...Array(3)].map((_, index) => (
                          <div key={index} className='min-w-[260px]'>
                              <StarRating rating={5} />
                              <p className='text-xl font-semibold'>Demo User</p>
                              <p className=''>
                                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel
                                  ipsam iusto atque commodi
                              </p>
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default Customer;
