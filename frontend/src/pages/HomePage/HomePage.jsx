import { useState, useEffect } from 'react';
import API_BASE_URL from '../../config/api';
import BookList from '../../components/BookList/BookList';
import './HomePage.css';

function HomePage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const apiUrl = `${API_BASE_URL}/api/books`;
                console.log('Fetching from:', apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    credentials: 'omit'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Received data:', data);
                setBooks(data.data || []);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError(error.message);
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