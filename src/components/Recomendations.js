import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Recommendations = ({ books }) => {
    const [sortBy, setSortBy] = useState('rating');
    const [filterLanguage, setFilterLanguage] = useState('all');

    const getRecommendedBooks = () => {
        let filtered = [...books];
        
        // Filter by language if selected
        if (filterLanguage !== 'all') {
            filtered = filtered.filter(book => book.language === filterLanguage);
        }

        // Sort books
        switch (sortBy) {
            case 'rating':
                filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                break;
            case 'year':
                filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));
                break;
            default:
                break;
        }

        return filtered.slice(0, 20); // Return top 20 books
    };

    const languages = [...new Set(books.map(book => book.language))];

    return (
        <div className="recommendations">
            <div className="filters">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="rating">Top Rated</option>
                    <option value="year">Newest</option>
                </select>
                <select value={filterLanguage} onChange={(e) => setFilterLanguage(e.target.value)}>
                    <option value="all">All Languages</option>
                    {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>
            <div className="book-grid">
                {getRecommendedBooks().map(book => (
                    <div key={book.id} className="book-card">
                        <img src={book.cover} alt={book.title} className="book-cover" />
                        <h3 className="book-title">{book.title}</h3>
                        <p className="book-year">{book.year}</p>
                        <p className="book-rating">Rating: {book.rating}</p>
                        <Link to={`/book/${book.id}`} className="book-link">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;