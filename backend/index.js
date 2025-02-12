const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
const allowedOrigins = [
    'https://book-review-app-final-git-main-vishals-projects-15f54387.vercel.app',
    'http://localhost:3001'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    credentials: false,
    optionsSuccessStatus: 200
};

// MongoDB Connection - Move this before routes
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully');
    console.log('Connection string:', process.env.MONGODB_URI);
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
});

// Move all middleware before routes
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pre-flight requests
app.options('*', cors(corsOptions));

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Book Review API is running' });
});

// Basic test route
app.get('/api/test', async (req, res) => {
    try {
        // Test MongoDB connection
        const isConnected = mongoose.connection.readyState === 1;
        res.json({ 
            message: 'API is working!',
            mongodbStatus: isConnected ? 'connected' : 'disconnected'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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