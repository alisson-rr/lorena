// Category Types
export interface CategoryItem {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  ageRating?: string;
  isPremium?: boolean;
  viewCount?: number;
  releaseDate?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'games' | 'videos' | 'series' | 'movies' | 'educational';
  items: CategoryItem[];
  totalItems?: number;
  description?: string;
}

export interface CategoriesResponse {
  categories: Category[];
  totalCategories: number;
  page: number;
  pageSize: number;
}