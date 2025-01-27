import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './StarRating.css';

function StarRating({ rating }) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(<FaStar key={i} className="star-filled" />);
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars.push(<FaStarHalfAlt key={i} className="star-filled" />);
        } else {
            stars.push(<FaRegStar key={i} className="star-empty" />);
        }
    }

    return (
        <div className="star-rating">
            <div className="star-container">{stars}</div>
            <span className="rating-number">{rating.toFixed(1)}</span>
        </div>
    );
}

export default StarRating; 