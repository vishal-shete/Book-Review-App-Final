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
const mongoose = require('mongoose');

// Get all books
router.get('/', async (req, res) => {
    try {
        console.log('GET /api/books route hit');
        
        // Check MongoDB connection
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Database not connected');
        }

        const books = await Book.find().lean();
        console.log('Books found:', books);

        // Ensure we're sending JSON
        res.setHeader('Content-Type', 'application/json');
        return res.json({
            success: true,
            data: books || [],
            count: books ? books.length : 0
        });
    } catch (error) {
        console.error('Error in GET /api/books:', error);
        // Ensure error response is also JSON
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ 
            success: false,
            message: 'Error fetching books',
            error: error.message 
        });
    }
});

// Get a specific book
router.get('/:id', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const book = await Book.findById(req.params.id).lean();
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
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
        res.setHeader('Content-Type', 'application/json');
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