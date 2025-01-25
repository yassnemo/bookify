import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/global.css';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        // Simulated book data
        setBook({
            id,
            title: "The Great Book",
            author: "John Doe",
            cover: "https://via.placeholder.com/300x400",
            description: "A fascinating journey through literature...",
            rating: 4.5,
            publishDate: "2023"
        });
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div className="book-details">
            <div className="book-image">
                <img src={book.cover} alt={book.title} className="book-cover" />
            </div>
            <div className="book-info">
                <h1 className="book-title">{book.title}</h1>
                <h2 className="book-author">by {book.author}</h2>
                <div className="book-rating">Rating: {book.rating}/5</div>
                <p className="book-description">{book.description}</p>
                <div className="book-metadata">
                    <p>Published: {book.publishDate}</p>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;