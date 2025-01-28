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
    console.log('GET /api/books route hit');
    try {
        const books = await Book.find().lean();
        console.log('Books found:', books);
        
        // Force JSON content type and proper headers
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        
        // Send response
        return res.status(200).json(books || []);
    } catch (error) {
        console.error('Error fetching books:', error);
        return res.status(500).json({ 
            message: 'Error fetching books',
            error: error.message 
        });
    }
});

// Get a specific book
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).lean();
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching book',
            error: error.message 
        });
    }
});

// Add a new book
router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ 
            message: 'Error creating book',
            error: error.message 
        });
    }
});

// Update a book
router.put('/:id', updateBook);

// Delete a book
router.delete('/:id', deleteBook);

module.exports = router; 