import { ProductEmpty } from '../components';
import { Loader, formatPrice } from '../utils';
import { useOrderQuery } from '../redux/apiSlice';

export default function OrderHistory() {
    const { data, isLoading } = useOrderQuery();
    if (isLoading) return <Loader />;

    if (!data.length) return <ProductEmpty />;

    return (
        <>
            <h2 className='my-5 text-center font-semibold text-xl'>
                Explore customers all order lists
            </h2>
            <div className='grid gap-4 text-gray-700 max-w-screen-lg mx-auto'>
                {data?.map((order) => (
                    <OrderItem key={order._id} {...order} />
                ))}
            </div>
        </>
    );
}

function OrderItem({
    username,
    email,
    address,
    createdAt,
    items = [{ price: 0, name: '', quantity: 0, _id: '' }],
}) {
    const totals = items.reduce((prev, curr) => curr.price * curr.quantity + prev, 0);

    return (
        <div className='py-4 px-8 bg-white hover:shadow'>
            <div className='flex items-center justify-between'>
                <h2 className='capitalize font-bold text-blue-600 text-lg hover:underline cursor-pointer'>
                    {username}
                </h2>
                <p className='text-sm'>{new Date(createdAt).toDateString()}</p>
            </div>
            <table>
                <tr>
                    <td className='px-2'>Email</td>
                    <td className='px-2'>:</td>
                    <td className='px-2'>{email}</td>
                </tr>
                <tr>
                    <td className='px-2'>Address</td>
                    <td className='px-2'>:</td>
                    <td className='px-2'>{address}</td>
                </tr>
                <tr>
                    <td className='px-2'>Total</td>
                    <td className='px-2'>:</td>
                    <td className='px-2'>{formatPrice(totals / 80)}</td>
                </tr>
            </table>
            <tr>
                <td className='px-2'>Product</td>
                <td className='px-2'>:</td>
                <td className='px-2'>
                    {items.map((item) => (
                        <p key={item._id}>{item.name}</p>
                    ))}
                </td>
            </tr>
        </div>
    );
}
