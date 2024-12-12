import Button from './Button';
import Inputs from './Inputs';
import LazyImage from './LazyImage';
import Loader from './Loader';
import StarRating from './StarRating';

// components
export { Button, Inputs, Loader, StarRating, LazyImage };

// Price formate in Dollar
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(price);
};

// all categories
export const categories = [
    'beauty',
    'fragrances',
    'furniture',
    'groceries',
    'home-decoration',
    'kitchen-accessories',
    'laptops',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'mobile-accessories',
    'motorcycle',
    'skin-care',
    'smartphones',
    'sports-accessories',
    'sunglasses',
    'tablets',
    'tops',
    'vehicle',
    'womens-bags',
    'womens-dresses',
    'womens-jewellery',
    'womens-shoes',
    'womens-watches',
];
