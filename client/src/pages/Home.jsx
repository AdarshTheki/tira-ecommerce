/* eslint-disable react/prop-types */
import { ItemList, FAQ } from '../components';

const HomePage = () => {
    return (
        <div className='w-full'>
            <img src='/banner-2.jpg' alt='banner_image' className='w-full object-contain' />
            <ItemList name='new arrivals' category='furniture' />
            <ItemList name='top selling' category='womens-bags' />
            <FAQ />
        </div>
    );
};

export default HomePage;
