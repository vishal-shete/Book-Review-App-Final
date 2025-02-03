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

                // First, test the API connection
                const testResponse = await fetch(`${API_BASE_URL}/api/test`);
                const testData = await testResponse.json();
                console.log('API Test Response:', testData);

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Response status:', response.status);
                console.log('Response headers:', Object.fromEntries(response.headers));

                const text = await response.text();
                console.log('Raw response:', text);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = JSON.parse(text);
                console.log('Parsed data:', data);

                if (data && data.data) {
                    setBooks(data.data);
                } else {
                    console.warn('No books data in response:', data);
                    setBooks([]);
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