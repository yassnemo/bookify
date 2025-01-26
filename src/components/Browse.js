import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Browse = ({ books }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('title');
    const [genre, setGenre] = useState('all');
    const booksPerPage = 12;

    // Sort and filter books
    const getSortedBooks = () => {
        let sorted = [...books];
        
        // Sort books
        switch (sortBy) {
            case 'title':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'year':
                sorted.sort((a, b) => b.year - a.year);
                break;
            case 'rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        // Get paginated results
        const lastBookIndex = currentPage * booksPerPage;
        const firstBookIndex = lastBookIndex - booksPerPage;
        return sorted.slice(firstBookIndex, lastBookIndex);
    };

    // Calculate total pages
    const totalPages = Math.ceil(books.length / booksPerPage);

    return (
        <div className="browse">
            <div className="browse-controls">
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="title">Sort by Title</option>
                    <option value="year">Sort by Year</option>
                    <option value="rating">Sort by Rating</option>
                </select>
            </div>

            <div className="book-grid">
                {getSortedBooks().map(book => (
                    <div key={book.id} className="book-card">
                        <img src={book.cover} alt={book.title} className="book-cover" />
                        <div className="book-info">
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-year">{book.year}</p>
                            <p className="book-publisher">{book.publisher}</p>
                            <Link to={`/book/${book.id}`} className="view-details">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Browse;