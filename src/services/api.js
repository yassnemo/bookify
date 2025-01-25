const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const fetchBooks = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/books?${queryString}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchBookById = async (bookId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

export const getRecommendations = async (bookId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations/${bookId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

export const searchBooks = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};