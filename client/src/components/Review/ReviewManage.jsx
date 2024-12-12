import { Star } from 'lucide-react';

export default function ReviewManage() {
    return (
        <div className='space-y-2 p-4 border rounded-lg max-w-[500px]'>
            <h2 className='font-semibold text-2xl'>Customer Reviews</h2>
            <div className='flex gap-2'>
                <Star fill='#facc15' color='#facc15' size={18} />
                <span>4 out of 5 stars Based on 1624 reviews</span>
            </div>
            <div className='grid gap-2'>
                {[33, 10, 24, 12, 76].map((num, index) => (
                    <div
                        key={index}
                        className='text-gray-800 flex sm:text-lg gap-4 items-center font-semibold'>
                        <p>{index + 1}</p>
                        <Star fill='#facc15' color='#facc15' size={18} />
                        <div className='border bg-gray-100 rounded-lg w-3/4'>
                            <div
                                className='p-1 bg-[#facc15] rounded-lg'
                                style={{ width: `${num}%` }}></div>
                        </div>
                        <p className='text-nowrap'>{num} %</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
