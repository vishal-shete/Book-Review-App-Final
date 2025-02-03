const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = process.env.NODE_ENV === 'production' 
    ? {
        origin: [
            'https://book-review-app-final-git-main-vishals-projects-15f54387.vercel.app'
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With']
    }
    : {
        origin: true, // Allow all origins in development
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With']
    };

app.use(cors(corsOptions));

// Pre-flight requests
app.options('*', cors(corsOptions));

// Move these before the routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Book Review API is running' });
});

// Test route to verify API is working
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// API routes
app.use('/api/books', require('./routes/books'));
app.use('/api/reviews', require('./routes/reviews'));

// Add this after your CORS configuration
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'API is running' });
});

// Add this near the top of your routes
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Error handling for 404
app.use('/api/*', (req, res) => {
    res.status(404).json({ message: 'API route not found' });
});

// General error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('MongoDB connection error:', err));

// Server startup with port retry logic
const startServer = (port) => {
    return new Promise((resolve, reject) => {
        try {
            const server = app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
                console.log(`API is available at http://localhost:${port}`);
                resolve(server);
            }).on('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    console.log(`Port ${port} is busy, trying ${port + 1}`);
                    resolve(startServer(port + 1));
                } else {
                    console.error('Server error:', err);
                    reject(err);
                }
            });
        } catch (err) {
            console.error('Server error:', err);
            reject(err);
        }
    });
};

// Only start the server in development
if (process.env.NODE_ENV !== 'production') {
    const PORT = parseInt(process.env.PORT) || 5001;
    startServer(PORT).then(() => {
        console.log('Server started successfully');
    }).catch(err => {
        console.error('Failed to start server:', err);
        process.exit(1);
    });
}

module.exports = app; 