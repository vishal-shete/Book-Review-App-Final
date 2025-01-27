import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import './BookList.css';

function BookList({ books }) {
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