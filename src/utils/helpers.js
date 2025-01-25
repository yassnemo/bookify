// This file contains utility functions that assist with various tasks, such as formatting book data.

export const formatBookData = (book) => {
    return {
        title: book.title,
        author: book.author,
        coverImage: book.coverImage || 'default-cover.jpg',
        description: book.description || 'No description available.',
    };
};

export const filterBooksBySearchTerm = (books, searchTerm) => {
    return books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
};