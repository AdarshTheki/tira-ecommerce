import { useParams } from 'react-router-dom';
import { useGetReviewByIdQuery } from '../redux/apiSlice';
import { ProductEmpty, ReviewForm } from '../components';

export default function ReviewLists() {
    const { id } = useParams();
    const { data } = useGetReviewByIdQuery(id);

    if (!data) return <ProductEmpty />;

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <ReviewForm {...data} />
        </div>
    );
}
