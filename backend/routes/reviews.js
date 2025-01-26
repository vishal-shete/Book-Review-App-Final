const express = require('express');
const router = express.Router();
const {
    getBookReviews,
    createReview,
    deleteReview
} = require('../controllers/reviewController');

// Get all reviews for a book
router.get('/book/:bookId', getBookReviews);

// Create a new review for a book
router.post('/book/:bookId', createReview);

// Delete a review
router.delete('/:id', deleteReview);

module.exports = router; 