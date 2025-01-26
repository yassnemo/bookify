import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/global.css';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`/data/books/${id}.xml`);
                if (!response.ok) throw new Error('Book not found');
                
                const xmlText = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                
                const bookElement = xmlDoc.getElementsByTagName('book')[0];
                if (!bookElement) throw new Error('Invalid book data');

                setBook({
                    id: bookElement.getElementsByTagName('id')[0]?.textContent,
                    title: bookElement.getElementsByTagName('title')[0]?.textContent.replace(/<!\[CDATA\[|\]\]>/g, ''),
                    isbn: bookElement.getElementsByTagName('isbn')[0]?.textContent.replace(/<!\[CDATA\[|\]\]>/g, ''),
                    year: bookElement.getElementsByTagName('publication_year')[0]?.textContent,
                    publisher: bookElement.getElementsByTagName('publisher')[0]?.textContent,
                    description: bookElement.getElementsByTagName('description')[0]?.textContent
                        .replace(/<!\[CDATA\[|\]\]>/g, '')
                        .replace(/<br \/>--scholastic\.com$/, ''),
                    cover: bookElement.getElementsByTagName('image_url')[0]?.textContent,
                    language: bookElement.getElementsByTagName('language_code')[0]?.textContent,
                    rating: bookElement.getElementsByTagName('average_rating')?.[0]?.textContent || 'N/A'
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) return <div className="loading">Loading book details...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!book) return <div className="error">Book not found</div>;

    return (
        <div className="book-details">
            <div className="book-image">
                <img src={book.cover} alt={book.title} className="book-cover" />
            </div>
            <div className="book-info">
                <h1 className="book-title">{book.title}</h1>
                <div className="book-metadata">
                    <p>ISBN: {book.isbn}</p>
                    <p>Published: {book.year} by {book.publisher}</p>
                    <p>Language: {book.language}</p>
                    <p>Rating: {book.rating}/5</p>
                </div>
                <p className="book-description">{book.description}</p>
            </div>
        </div>
    );
};

export default BookDetails;

