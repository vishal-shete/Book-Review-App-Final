import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

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
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            {error && (
                <div className="mb-4 text-red-500 text-sm">{error}</div>
            )}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating (required)
                </label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <FaStar
                            key={value}
                            className={`cursor-pointer w-8 h-8 ${
                                value <= (hover || rating)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                            }`}
                            onClick={() => setRating(value)}
                            onMouseEnter={() => setHover(value)}
                            onMouseLeave={() => setHover(0)}
                        />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review (required)
                </label>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    rows="4"
                    placeholder="Write your review here..."
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                disabled={!rating || !review.trim()}
            >
                Submit Review
            </button>
        </form>
    );
}

export default ReviewForm; 