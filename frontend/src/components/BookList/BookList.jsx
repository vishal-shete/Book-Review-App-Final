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
                
                const response = await fetch(`${API_BASE_URL}/api/books`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Failed to load books. Please try again later.');
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

    if (!books.length) {
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