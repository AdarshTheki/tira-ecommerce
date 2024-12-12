import toast from 'react-hot-toast';
import Inputs from '../../utils/Inputs';

export default function UserInformation() {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                toast.success('');
            }}
            className='bg-white p-4 shadow w-full'>
            <h2 className='text-xl font-bold my-3'>General information</h2>
            <div className='sm:grid gap-x-5 grid-cols-2'>
                <Inputs label='first name' type='text' placeholder='Adarsh' />
                <Inputs label='last name' type='text' placeholder='Verma' />
                <Inputs label='country' type='text' placeholder='India' />
                <Inputs label='city' type='text' placeholder='e.g. Nagpur' />
                <Inputs label='address' type='text' placeholder='e.g. Maharashtra' />
                <Inputs label='email' type='email' placeholder='name@company.com' />
                <Inputs label='phone number' type='tel' placeholder='e.g. +91 1234567890' />
                <Inputs label='birthday' type='text' placeholder='28/05/1999' />
                <Inputs label='organization' type='text' placeholder='Company Name' />
                <Inputs label='role' type='text' placeholder='React Developer' />
                <Inputs label='department' type='text' placeholder='Department' />
                <Inputs label='zip / postal code' type='number' placeholder='123456' />
            </div>
            <button className='text-sm px-6 py-2 rounded-lg bg-blue-700 hover:bg-blue-900 text-white font-semibold'>
                Save All
            </button>
        </form>
    );
}
