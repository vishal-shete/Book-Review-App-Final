import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bookAPI, reviewAPI } from '../../services/api';
import StarRating from '../../components/StarRating/StarRating';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import './BookDetailPage.css';

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
            setReviews(prevReviews => [response.data, ...prevReviews]);
            
            const bookResponse = await bookAPI.getBook(id);
            setBook(bookResponse.data);
        } catch (error) {
            setSubmitError('Failed to submit review. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!book) return <div>Book not found</div>;

    return (
        <div className="book-detail-page">
            <div className="book-info">
                <h1 className="book-title">{book.title}</h1>
                <p className="book-author">By {book.author}</p>
                <p className="book-meta">
                    {book.genre} • Published in {book.yearOfPublication}
                </p>
                <div className="book-rating">
                    <StarRating rating={book.averageRating} />
                </div>
                <p className="book-description">{book.description}</p>
            </div>

            <div className="review-section">
                <h2 className="section-title">Write a Review</h2>
                {submitError && (
                    <div className="error-message">{submitError}</div>
                )}
                <ReviewForm onSubmit={handleReviewSubmit} />
            </div>

            <div className="reviews-section">
                <h2 className="section-title">Reviews</h2>
                {reviews.length === 0 ? (
                    <p className="no-reviews">No reviews yet. Be the first to review!</p>
                ) : (
                    <div className="reviews-list">
                        {reviews.map((review) => (
                            <div key={review._id} className="review-card">
                                <StarRating rating={review.rating} />
                                <p className="review-text">{review.review}</p>
                                <p className="review-date">
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