import toast from 'react-hot-toast';
import { Inputs } from '../../utils';

export default function UserPassword() {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                toast.success('');
            }}
            className='bg-white p-4 shadow w-full'>
            <h2 className='text-lg font-bold my-3'>Password information</h2>
            <Inputs label='your email' type='email' placeholder='name@company.com' />
            <Inputs label='password' type='password' placeholder='●●●●●●●' />
            <Inputs label='new password' type='old_password' placeholder='●●●●●●●' />
            <Inputs label='conform new password' type='new_password' placeholder='●●●●●●●' />
            <p className='mb-3'>
                I accept the{' '}
                <span className='text-blue-600 font-semibold hover:opacity-80 cursor-pointer'>
                    Terms and Conditions
                </span>
            </p>
            <button className='text-sm px-6 py-2 rounded-lg bg-blue-700 hover:bg-blue-900 text-white font-semibold'>
                Password Update
            </button>
        </form>
    );
}
