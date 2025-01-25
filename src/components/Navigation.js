import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navigation = ({ onSearch }) => {
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <div className="nav-brand">
            <Link to="/" className="nav-logo">
              BookRecommender
            </Link>
          </div>
          
          <SearchBar onSearch={onSearch} />
          
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/recommendations" className="nav-link">Recommendations</Link>
            <Link to="/browse" className="nav-link">Browse</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;