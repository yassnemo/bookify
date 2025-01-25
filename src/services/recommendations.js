import { fetchBooks } from './api';

class RecommendationService {
    constructor() {
        this.cachedBooks = [];
    }

    async initializeBooks() {
        if (this.cachedBooks.length === 0) {
            this.cachedBooks = await fetchBooks();
        }
    }

  async getRecommendations(userPreferences = {}) {
    await this.initializeBooks();
    return this.filterAndSortBooks(userPreferences);
  }

  async getPopularBooks(limit = 10) {
    await this.initializeBooks();
    return this.cachedBooks
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  async getSimilarBooks(bookId, limit = 5) {
    await this.initializeBooks();
    const book = this.cachedBooks.find(b => b.id === bookId);
    if (!book) return [];

    return this.cachedBooks
      .filter(b => b.id !== bookId && b.genre === book.genre)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  filterAndSortBooks({ genre, minRating = 0, sortBy = 'rating' }) {
    let filtered = [...this.cachedBooks];

    if (genre) {
      filtered = filtered.filter(book => book.genre === genre);
    }

    filtered = filtered.filter(book => book.rating >= minRating);

    const sortFunctions = {
      rating: (a, b) => b.rating - a.rating,
      title: (a, b) => a.title.localeCompare(b.title),
      date: (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
    };

    return filtered.sort(sortFunctions[sortBy] || sortFunctions.rating);
  }
}

export default new RecommendationService();