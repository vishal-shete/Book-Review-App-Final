import API_BASE_URL from '../config/api';

// Book API calls
export const bookAPI = {
    getAllBooks: async () => {
        const response = await fetch(`${API_BASE_URL}/api/books`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    },
    getBook: (id) => fetch(`${API_BASE_URL}/api/books/${id}`),
    createBook: (bookData) => fetch(`${API_BASE_URL}/api/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    }),
    updateBook: (id, bookData) => fetch(`${API_BASE_URL}/api/books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    }),
    deleteBook: (id) => fetch(`${API_BASE_URL}/api/books/${id}`, {
        method: 'DELETE'
    })
};

// Review API calls
export const reviewAPI = {
    getBookReviews: (bookId) => fetch(`${API_BASE_URL}/api/reviews/book/${bookId}`),
    createReview: (bookId, reviewData) => fetch(`${API_BASE_URL}/api/reviews/book/${bookId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    }),
    deleteReview: (id) => fetch(`${API_BASE_URL}/api/reviews/${id}`, {
        method: 'DELETE'
    })
}; 