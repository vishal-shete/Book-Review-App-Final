const Review = require('../models/Review');
const Book = require('../models/Book');

// Get all reviews for a book
const getBookReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ bookId: req.params.bookId })
            .sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new review
const createReview = async (req, res) => {
    try {
        // Create the review
        const review = await Review.create({
            bookId: req.params.bookId,
            rating: req.body.rating,
            review: req.body.review
        });

        // Calculate new average rating
        const reviews = await Review.find({ bookId: req.params.bookId });
        const averageRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

        // Update book's average rating
        await Book.findByIdAndUpdate(req.params.bookId, { 
            averageRating: Number(averageRating.toFixed(1)) 
        });

        res.status(201).json(review);
    } catch (error) {
        console.error('Review creation error:', error);
        res.status(400).json({ message: error.message });
    }
};

// Delete review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Recalculate average rating
        const reviews = await Review.find({ bookId: review.bookId });
        const averageRating = reviews.length > 0
            ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
            : 0;

        // Update book's average rating
        await Book.findByIdAndUpdate(review.bookId, { averageRating });

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBookReviews,
    createReview,
    deleteReview
}; 