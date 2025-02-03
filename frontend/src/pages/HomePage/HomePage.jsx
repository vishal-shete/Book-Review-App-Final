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
                    },
                    mode: 'cors'
                });

                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error response:', errorText);
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