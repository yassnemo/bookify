import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('renders navigation bar', () => {
    render(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('search functionality works', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/search books/i);
    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } });
    expect(searchInput.value).toBe('Harry Potter');
  });

  test('renders book list', () => {
    render(<App />);
    const bookList = screen.getByTestId('book-list');
    expect(bookList).toBeInTheDocument();
  });

  test('displays book cards', async () => {
    render(<App />);
    const bookCards = await screen.findAllByTestId('book-card');
    expect(bookCards.length).toBeGreaterThan(0);
  });

  test('filters books when searching', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/search books/i);
    fireEvent.change(searchInput, { target: { value: 'Potter' } });
    const filteredBooks = await screen.findAllByTestId('book-card');
    expect(filteredBooks.length).toBeGreaterThan(0);
  });
});