import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">Book Review App</Link>
                <Link to="/add-book" className="navbar-add-button">
                    Add New Book
                </Link>
            </div>
        </nav>
    );
}

export default Navbar; 