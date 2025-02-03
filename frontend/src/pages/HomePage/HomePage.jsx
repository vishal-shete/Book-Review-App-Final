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
                console.log('Attempting to fetch from:', `${API_BASE_URL}/api/books`);
                
                const response = await fetch(`${API_BASE_URL}/api/books`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                const contentType = response.headers.get('content-type');
                console.log('Response content-type:', contentType);
                
                const text = await response.text();
                console.log('Raw response:', text);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                try {
                    const data = JSON.parse(text);
                    console.log('Parsed data:', data);
                    setBooks(data.data || []);
                } catch (parseError) {
                    console.error('JSON Parse Error:', parseError);
                    throw new Error('Invalid response format from server');
                }
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