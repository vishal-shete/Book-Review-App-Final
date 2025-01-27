import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import './BookList.css';
import API_BASE_URL from '../../config/api';
import { useEffect, useState } from 'react';

function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/books`, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

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