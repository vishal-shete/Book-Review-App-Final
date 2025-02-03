import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import './BookList.css';
import API_BASE_URL from '../../config/api';
import { useEffect, useState } from 'react';

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const fullUrl = `${API_BASE_URL}/api/books`;
                console.log('Fetching from:', fullUrl);
                
                const response = await fetch(fullUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors'
                });

                // Log the full response details
                console.log('Response status:', response.status);
                console.log('Response headers:', Object.fromEntries(response.headers));
                
                const text = await response.text();
                console.log('Raw response:', text);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                try {
                    const jsonData = JSON.parse(text);
                    // Extract books from the data property
                    setBooks(jsonData.data || []);
                } catch (parseError) {
                    console.error('JSON Parse Error:', parseError);
                    throw new Error('Invalid response format from server');
                }
            } catch (error) {
                console.error('Error fetching books:', error);
                setError(`Failed to load books: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    if (loading) {
        return <div className="loading">Loading books...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!books || !books.length) {
        return <div className="no-books">No books found.</div>;
    }

    return (
        <div className="book-grid">
            {books.map((book) => (
                <div key={book._id} className="book-card">
                    <div className="book-card-body">
                        <h2 className="book-title">{book.title}</h2>
                        <p className="book-author">By {book.author}</p>
                        <p className="book-genre">{book.genre}</p>
                        <div className="book-rating">
                            <StarRating rating={book.averageRating} />
                        </div>
                        <p className="book-description">{book.description}</p>
                        <Link 
                            to={`/book/${book._id}`}
                            className="view-details-button"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookList; 