import { create } from 'zustand';
import {
  Article,
  DashboardStats,
  Suggestion,
  mockArticles,
  suggestions,
  getDashboardStats,
} from '../utils/mockData';

interface AppState {
  articles: Article[];
  dashboardStats: DashboardStats;
  suggestions: Suggestion[];
  searchTerm: string;
  sortBy: 'date' | 'views' | 'likes';
  setSearchTerm: (term: string) => void;
  setSortBy: (sortBy: 'date' | 'views' | 'likes') => void;
  getFilteredArticles: () => Article[];
}

export const useStore = create<AppState>((set, get) => ({
  articles: mockArticles,
  dashboardStats: getDashboardStats(),
  suggestions: suggestions,
  searchTerm: '',
  sortBy: 'date',

  setSearchTerm: (term) => set({ searchTerm: term }),

  setSortBy: (sortBy) => set({ sortBy }),

  getFilteredArticles: () => {
    const { articles, searchTerm, sortBy } = get();
    let filtered = [...articles];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(term) ||
          article.category.toLowerCase().includes(term)
      );
    }

    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'views') {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'likes') {
      filtered.sort((a, b) => b.likes - a.likes);
    }

    return filtered;
  },
}));
