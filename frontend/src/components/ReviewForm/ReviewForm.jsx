import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './ReviewForm.css';

function ReviewForm({ onSubmit }) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [hover, setHover] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        if (!review.trim()) {
            setError('Please write a review');
            return;
        }

        try {
            await onSubmit({ rating, review });
            setRating(0);
            setReview('');
            setError('');
        } catch (err) {
            setError('Failed to submit review. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="review-form">
            {error && (
                <div className="review-error">{error}</div>
            )}
            <div className="rating-field">
                <label className="rating-label">
                    Rating (required)
                </label>
                <div className="star-input">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <FaStar
                            key={value}
                            className={`star-icon ${
                                value <= (hover || rating)
                                    ? 'star-filled'
                                    : 'star-empty'
                            }`}
                            onClick={() => setRating(value)}
                            onMouseEnter={() => setHover(value)}
                            onMouseLeave={() => setHover(0)}
                        />
                    ))}
                </div>
            </div>
            <div className="review-field">
                <label className="review-label">
                    Your Review (required)
                </label>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="review-textarea"
                    rows="4"
                    placeholder="Write your review here..."
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="submit-button"
                disabled={!rating || !review.trim()}
            >
                Submit Review
            </button>
        </form>
    );
}

export default ReviewForm; 