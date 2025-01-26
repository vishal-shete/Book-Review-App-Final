import { Link } from 'react-router-dom';
import StarRating from './StarRating';

function BookList({ books }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
                <div key={book._id} className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                    <p className="text-gray-600 mb-2">By {book.author}</p>
                    <p className="text-sm text-gray-500 mb-2">{book.genre}</p>
                    <div className="mb-4">
                        <StarRating rating={book.averageRating} />
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-3">{book.description}</p>
                    <Link 
                        to={`/book/${book._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default BookList; 