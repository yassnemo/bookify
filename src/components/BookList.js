import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books }) => {
    return (
        <div className="book-list">
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
};

export default BookList;