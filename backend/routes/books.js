const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific book
router.get('/:id', getBook);

// Add a new book
router.post('/', createBook);

// Update a book
router.put('/:id', updateBook);

// Delete a book
router.delete('/:id', deleteBook);

module.exports = router; 