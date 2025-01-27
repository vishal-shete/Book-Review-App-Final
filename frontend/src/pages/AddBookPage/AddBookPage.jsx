import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookAPI } from '../../services/api';
import './AddBookPage.css';

function AddBookPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        yearOfPublication: '',
        genre: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await bookAPI.createBook(formData);
            navigate('/');
        } catch (err) {
            setError('Failed to add book. Please try again.');
        }
    };

    return (
        <div className="add-book-page">
            <h1 className="page-title">Add a New Book</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="book-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="yearOfPublication">Year of Publication</label>
                    <input
                        type="number"
                        id="yearOfPublication"
                        name="yearOfPublication"
                        value={formData.yearOfPublication}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="form-control"
                        rows="4"
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">
                    Add Book
                </button>
            </form>
        </div>
    );
}

export default AddBookPage; 