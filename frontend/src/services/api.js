import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Book API calls
export const bookAPI = {
    getAllBooks: () => axios.get(`${API_URL}/books`),
    getBook: (id) => axios.get(`${API_URL}/books/${id}`),
    createBook: (bookData) => axios.post(`${API_URL}/books`, bookData),
    updateBook: (id, bookData) => axios.put(`${API_URL}/books/${id}`, bookData),
    deleteBook: (id) => axios.delete(`${API_URL}/books/${id}`)
};

// Review API calls
export const reviewAPI = {
    getBookReviews: (bookId) => axios.get(`${API_URL}/reviews/book/${bookId}`),
    createReview: (bookId, reviewData) => axios.post(`${API_URL}/reviews/book/${bookId}`, reviewData),
    deleteReview: (id) => axios.delete(`${API_URL}/reviews/${id}`)
}; 