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
                    credentials: 'omit'
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error response:', errorText);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Response is not JSON");
                }

                const data = await response.json();
                console.log('Received data:', data);

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