import { useState, useEffect } from 'react';
import { bookAPI } from '../../services/api';
import BookList from '../../components/BookList/BookList';
import './HomePage.css';

function HomePage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await bookAPI.getAllBooks();
                setBooks(response.data);
            } catch (err) {
                setError('Failed to fetch books');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="home-page">
            <h1 className="page-title">Book Collection</h1>
            <BookList books={books} />
        </div>
    );
}

export default HomePage; 