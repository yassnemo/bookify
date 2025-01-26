import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import Browse from './components/Browse';
import parseXMLBooks from './utils/xmlParser';

function App() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const newBooks = await parseXMLBooks(currentPage);
                setBooks(prev => [...prev, ...newBooks]);
                setFilteredBooks(prev => [...prev, ...newBooks]);
            } catch (err) {
                setError('Failed to load books');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        
        loadBooks();
    }, [currentPage]);

    const loadMore = () => {
        setCurrentPage(prev => prev + 1);
    };
    const handleSearch = (query) => {
        if (!query.trim()) {
            setFilteredBooks(books);
            return;
        }
        
        const filtered = books.filter(book => 
            book.title?.toLowerCase().includes(query.toLowerCase()) ||
            book.author?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    if (loading) return <div className="loading">Loading books...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <Router>
            <div className="app">
                <Navigation onSearch={handleSearch} />
                <main>
                    <Routes>
                        <Route path="/" element={<BookList books={filteredBooks} />} />
                        <Route path="/browse" element={<Browse books={books} />} />
                        <Route path="/book/:id" element={<BookDetails />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;