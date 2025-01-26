import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bookAPI, reviewAPI } from '../services/api';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';

function BookDetailPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        const fetchBookAndReviews = async () => {
            try {
                const [bookResponse, reviewsResponse] = await Promise.all([
                    bookAPI.getBook(id),
                    reviewAPI.getBookReviews(id)
                ]);
                setBook(bookResponse.data);
                setReviews(reviewsResponse.data);
            } catch (err) {
                setError('Failed to fetch book details');
            } finally {
                setLoading(false);
            }
        };

        fetchBookAndReviews();
    }, [id]);

    const handleReviewSubmit = async (reviewData) => {
        try {
            setSubmitError(null);
            const response = await reviewAPI.createReview(id, reviewData);
            
            // Add the new review to the beginning of the reviews array
            setReviews(prevReviews => [response.data, ...prevReviews]);
            
            // Fetch updated book data to get new average rating
            const bookResponse = await bookAPI.getBook(id);
            setBook(bookResponse.data);
        } catch (error) {
            console.error('Failed to submit review:', error);
            setSubmitError('Failed to submit review. Please try again.');
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;
    if (!book) return <div className="text-center">Book not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
                <p className="text-gray-600 mb-2">By {book.author}</p>
                <p className="text-sm text-gray-500 mb-4">
                    {book.genre} • Published in {book.yearOfPublication}
                </p>
                <div className="mb-4">
                    <StarRating rating={book.averageRating} />
                </div>
                <p className="text-gray-700">{book.description}</p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
                {submitError && (
                    <div className="text-red-500 mb-4">{submitError}</div>
                )}
                <ReviewForm onSubmit={handleReviewSubmit} />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review._id} className="bg-white rounded-lg shadow-md p-4">
                                <StarRating rating={review.rating} />
                                <p className="mt-2">{review.review}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookDetailPage; 