import { Category, CategoryItem, CategoriesResponse } from '../types/category';

// Mock data for games
const gameItems: CategoryItem[] = [
  {
    id: 'game-1',
    title: 'Super Aventura',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=300&h=300&fit=crop',
    ageRating: 'L',
    isPremium: false,
    viewCount: 15420,
  },
  {
    id: 'game-2',
    title: 'Quebra-Cabeça Mágico',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=300&fit=crop',
    ageRating: 'L',
    isPremium: false,
    viewCount: 8932,
  },
  {
    id: 'game-3',
    title: 'Corrida Espacial',
    thumbnail: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?w=300&h=300&fit=crop',
    ageRating: '10',
    isPremium: true,
    viewCount: 23105,
  },
  {
    id: 'game-4',
    title: 'Mundo dos Dinossauros',
    thumbnail: 'https://images.unsplash.com/photo-1606092195730-5d065b1e05dc?w=300&h=300&fit=crop',
    ageRating: 'L',
    isPremium: false,
    viewCount: 19877,
  },
  {
    id: 'game-5',
    title: 'Construtor de Cidades',
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=300&h=300&fit=crop',
    ageRating: 'L',
    isPremium: true,
    viewCount: 12456,
  },
  {
    id: 'game-6',
    title: 'Fazenda Divertida',
    thumbnail: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=300&h=300&fit=crop',
    ageRating: 'L',
    isPremium: false,
    viewCount: 31002,
  },
];

// Mock data for educational content
const educationalItems: CategoryItem[] = [
  {
    id: 'edu-1',
    title: 'Aprendendo o Alfabeto',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=400&fit=crop',
    duration: '15:30',
    ageRating: 'L',
    isPremium: false,
    viewCount: 45320,
    releaseDate: '2024-01-15',
  },
  {
    id: 'edu-2',
    title: 'Números e Contagem',
    thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=300&h=400&fit=crop',
    duration: '12:45',
    ageRating: 'L',
    isPremium: false,
    viewCount: 38912,
    releaseDate: '2024-01-20',
  },
  {
    id: 'edu-3',
    title: 'Cores e Formas',
    thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=300&h=400&fit=crop',
    duration: '10:20',
    ageRating: 'L',
    isPremium: false,
    viewCount: 52100,
    releaseDate: '2024-01-25',
  },
  {
    id: 'edu-4',
    title: 'Ciências Divertidas',
    thumbnail: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=300&h=400&fit=crop',
    duration: '18:50',
    ageRating: 'L',
    isPremium: true,
    viewCount: 29054,
    releaseDate: '2024-02-01',
  },
  {
    id: 'edu-5',
    title: 'História para Crianças',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    duration: '22:15',
    ageRating: '10',
    isPremium: true,
    viewCount: 15678,
    releaseDate: '2024-02-05',
  },
];

// Mock data for adventure series
const adventureItems: CategoryItem[] = [
  {
    id: 'adv-1',
    title: 'Ilha do Tesouro',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=400&fit=crop',
    duration: '25:00',
    ageRating: 'L',
    isPremium: false,
    viewCount: 67890,
    releaseDate: '2024-01-10',
  },
  {
    id: 'adv-2',
    title: 'Floresta Encantada',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=400&fit=crop',
    duration: '23:30',
    ageRating: 'L',
    isPremium: false,
    viewCount: 54321,
    releaseDate: '2024-01-12',
  },
  {
    id: 'adv-3',
    title: 'Viagem ao Centro da Terra',
    thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=400&fit=crop',
    duration: '28:45',
    ageRating: '10',
    isPremium: true,
    viewCount: 43210,
    releaseDate: '2024-01-18',
  },
  {
    id: 'adv-4',
    title: 'Piratas do Caribe Júnior',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=400&fit=crop',
    duration: '20:15',
    ageRating: 'L',
    isPremium: false,
    viewCount: 78965,
    releaseDate: '2024-01-22',
  },
  {
    id: 'adv-5',
    title: 'Montanha Mágica',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
    duration: '19:50',
    ageRating: 'L',
    isPremium: true,
    viewCount: 34567,
    releaseDate: '2024-01-28',
  },
];

// Mock data for comedy series
const comedyItems: CategoryItem[] = [
  {
    id: 'com-1',
    title: 'Risadas e Travessuras',
    thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=300&h=400&fit=crop',
    duration: '15:00',
    ageRating: 'L',
    isPremium: false,
    viewCount: 89012,
    releaseDate: '2024-01-05',
  },
  {
    id: 'com-2',
    title: 'Palhaço Pipoca',
    thumbnail: 'https://images.unsplash.com/photo-1527004760902-f524844a9e1a?w=300&h=400&fit=crop',
    duration: '12:30',
    ageRating: 'L',
    isPremium: false,
    viewCount: 76543,
    releaseDate: '2024-01-08',
  },
  {
    id: 'com-3',
    title: 'Turma da Bagunça',
    thumbnail: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=300&h=400&fit=crop',
    duration: '18:20',
    ageRating: 'L',
    isPremium: false,
    viewCount: 92100,
    releaseDate: '2024-01-14',
  },
  {
    id: 'com-4',
    title: 'Zoo Maluco',
    thumbnail: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=300&h=400&fit=crop',
    duration: '16:45',
    ageRating: 'L',
    isPremium: true,
    viewCount: 45678,
    releaseDate: '2024-01-19',
  },
  {
    id: 'com-5',
    title: 'Escola de Risos',
    thumbnail: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=300&h=400&fit=crop',
    duration: '14:10',
    ageRating: 'L',
    isPremium: false,
    viewCount: 61234,
    releaseDate: '2024-01-24',
  },
];

// Mock data for fantasy series
const fantasyItems: CategoryItem[] = [
  {
    id: 'fan-1',
    title: 'Reino das Fadas',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=400&fit=crop',
    duration: '22:00',
    ageRating: 'L',
    isPremium: false,
    viewCount: 72345,
    releaseDate: '2024-01-02',
  },
  {
    id: 'fan-2',
    title: 'Dragões Amigos',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc9e?w=300&h=400&fit=crop',
    duration: '26:30',
    ageRating: 'L',
    isPremium: true,
    viewCount: 58901,
    releaseDate: '2024-01-07',
  },
  {
    id: 'fan-3',
    title: 'Castelo Encantado',
    thumbnail: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=400&fit=crop',
    duration: '24:15',
    ageRating: 'L',
    isPremium: false,
    viewCount: 81234,
    releaseDate: '2024-01-11',
  },
  {
    id: 'fan-4',
    title: 'Unicórnios Mágicos',
    thumbnail: 'https://images.unsplash.com/photo-1559666126-84f389727b9a?w=300&h=400&fit=crop',
    duration: '19:40',
    ageRating: 'L',
    isPremium: true,
    viewCount: 39876,
    releaseDate: '2024-01-16',
  },
  {
    id: 'fan-5',
    title: 'Portal Mágico',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=400&fit=crop',
    duration: '21:20',
    ageRating: '10',
    isPremium: false,
    viewCount: 56789,
    releaseDate: '2024-01-21',
  },
];

// Mock data for science series
const scienceItems: CategoryItem[] = [
  {
    id: 'sci-1',
    title: 'Laboratório Divertido',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=400&fit=crop',
    duration: '17:30',
    ageRating: 'L',
    isPremium: false,
    viewCount: 42100,
    releaseDate: '2024-01-03',
  },
  {
    id: 'sci-2',
    title: 'Espaço Sideral',
    thumbnail: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=400&fit=crop',
    duration: '20:45',
    ageRating: 'L',
    isPremium: true,
    viewCount: 35678,
    releaseDate: '2024-01-09',
  },
  {
    id: 'sci-3',
    title: 'Robôs e Tecnologia',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=400&fit=crop',
    duration: '18:00',
    ageRating: '10',
    isPremium: false,
    viewCount: 48932,
    releaseDate: '2024-01-13',
  },
  {
    id: 'sci-4',
    title: 'Natureza Incrível',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=400&fit=crop',
    duration: '23:10',
    ageRating: 'L',
    isPremium: false,
    viewCount: 61045,
    releaseDate: '2024-01-17',
  },
  {
    id: 'sci-5',
    title: 'Inventores Mirins',
    thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=400&fit=crop',
    duration: '16:25',
    ageRating: 'L',
    isPremium: true,
    viewCount: 27890,
    releaseDate: '2024-01-23',
  },
];

// Complete mock categories data
const mockCategories: Category[] = [
  {
    id: 'cat-games',
    name: 'Jogos',
    slug: 'jogos',
    type: 'games',
    items: gameItems,
    totalItems: gameItems.length,
    description: 'Jogos educativos e divertidos para todas as idades',
  },
  {
    id: 'cat-educational',
    name: 'Educativo',
    slug: 'educativo',
    type: 'educational',
    items: educationalItems,
    totalItems: educationalItems.length,
    description: 'Conteúdo educacional para aprender brincando',
  },
  {
    id: 'cat-adventure',
    name: 'Aventura',
    slug: 'aventura',
    type: 'series',
    items: adventureItems,
    totalItems: adventureItems.length,
    description: 'Séries de aventura emocionantes',
  },
  {
    id: 'cat-comedy',
    name: 'Comédia',
    slug: 'comedia',
    type: 'series',
    items: comedyItems,
    totalItems: comedyItems.length,
    description: 'Séries engraçadas para toda a família',
  },
  {
    id: 'cat-fantasy',
    name: 'Fantasia',
    slug: 'fantasia',
    type: 'series',
    items: fantasyItems,
    totalItems: fantasyItems.length,
    description: 'Mundos mágicos e imaginários',
  },
  {
    id: 'cat-science',
    name: 'Ciências',
    slug: 'ciencias',
    type: 'educational',
    items: scienceItems,
    totalItems: scienceItems.length,
    description: 'Descobrindo o mundo da ciência',
  },
];

// Service class for category operations
class CategoryService {
  // Simulate API delay
  private simulateDelay = (ms: number = 800) => 
    new Promise(resolve => setTimeout(resolve, ms));

  // Get all categories
  async getCategories(): Promise<CategoriesResponse> {
    await this.simulateDelay();
    
    return {
      categories: mockCategories,
      totalCategories: mockCategories.length,
      page: 1,
      pageSize: 10,
    };
  }

  // Get category by ID
  async getCategoryById(categoryId: string): Promise<Category | null> {
    await this.simulateDelay(500);
    
    const category = mockCategories.find(cat => cat.id === categoryId);
    return category || null;
  }

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    await this.simulateDelay(500);
    
    const category = mockCategories.find(cat => cat.slug === slug);
    return category || null;
  }

  // Get items from a specific category
  async getCategoryItems(
    categoryId: string, 
    page: number = 1, 
    pageSize: number = 20
  ): Promise<CategoryItem[]> {
    await this.simulateDelay(600);
    
    const category = mockCategories.find(cat => cat.id === categoryId);
    if (!category) return [];
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return category.items.slice(startIndex, endIndex);
  }

  // Search items across all categories
  async searchItems(query: string): Promise<CategoryItem[]> {
    await this.simulateDelay(700);
    
    const lowerQuery = query.toLowerCase();
    const results: CategoryItem[] = [];
    
    mockCategories.forEach(category => {
      const matchingItems = category.items.filter(item =>
        item.title.toLowerCase().includes(lowerQuery)
      );
      results.push(...matchingItems);
    });
    
    return results;
  }

  // Get featured items (most viewed)
  async getFeaturedItems(): Promise<CategoryItem[]> {
    await this.simulateDelay(500);
    
    const allItems: CategoryItem[] = [];
    mockCategories.forEach(category => {
      allItems.push(...category.items);
    });
    
    // Sort by view count and return top 10
    return allItems
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 10);
  }

  // Get items by type
  async getItemsByType(type: Category['type']): Promise<CategoryItem[]> {
    await this.simulateDelay(600);
    
    const items: CategoryItem[] = [];
    
    mockCategories
      .filter(category => category.type === type)
      .forEach(category => {
        items.push(...category.items);
      });
    
    return items;
  }

  // Get all items for a category with pagination and enhanced mock data
  async getCategoryItemsDetailed(categoryId: string, page: number = 1, limit: number = 20): Promise<{
    items: CategoryItem[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }> {
    await this.simulateDelay(500);
    
    // Generate more mock items for the category detail page
    const baseItems: CategoryItem[] = [
      {
        id: `${categoryId}-detail-1`,
        title: 'Espaço para o título do vídeo',
        thumbnail: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=600&fit=crop',
      },
      {
        id: `${categoryId}-detail-2`,
        title: 'Espaço para o título do vídeo',
        thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=600&fit=crop',
      },
      {
        id: `${categoryId}-detail-3`,
        title: 'Espaço para o título do vídeo',
        thumbnail: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=600&fit=crop',
      },
    ];

    // Generate 246 items total (as shown in Figma)
    const allItems: CategoryItem[] = [];
    for (let i = 0; i < 246; i++) {
      const baseItem = baseItems[i % baseItems.length];
      allItems.push({
        ...baseItem,
        id: `${categoryId}-detail-${i + 1}`,
        title: `Espaço para o título do vídeo`,
      });
    }

    // Paginate results
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = allItems.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      totalCount: allItems.length,
      currentPage: page,
      totalPages: Math.ceil(allItems.length / limit),
    };
  }

  // Search items within a category with enhanced results
  async searchCategoryItemsDetailed(categoryId: string, query: string): Promise<{
    items: CategoryItem[];
    totalCount: number;
  }> {
    await this.simulateDelay(300);
    
    const { items: allItems, totalCount } = await this.getCategoryItemsDetailed(categoryId, 1, 246);
    
    if (!query || query === 'lore') {
      // Return all items if query is empty or 'lore' (as shown in Figma)
      return {
        items: allItems.slice(0, 20),
        totalCount: 246,
      };
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filteredItems = allItems.filter(item => 
      item.title.toLowerCase().includes(lowercaseQuery)
    );
    
    return {
      items: filteredItems.slice(0, 20),
      totalCount: filteredItems.length,
    };
  }

  // Sort items by different criteria
  async sortCategoryItems(
    categoryId: string, 
    sortBy: 'recent' | 'popular' | 'alphabetical' = 'recent',
    page: number = 1,
    limit: number = 20
  ): Promise<{
    items: CategoryItem[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }> {
    await this.simulateDelay(400);
    
    const { items: allItems, totalCount } = await this.getCategoryItemsDetailed(categoryId, 1, 246);
    
    // Apply sorting
    let sortedItems = [...allItems];
    switch (sortBy) {
      case 'popular':
        // Shuffle for mock popular sorting
        sortedItems = sortedItems.sort(() => Math.random() - 0.5);
        break;
      case 'alphabetical':
        sortedItems = sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'recent':
      default:
        // Keep original order for recent
        break;
    }
    
    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = sortedItems.slice(startIndex, endIndex);
    
    return {
      items: paginatedItems,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }
}

// Export singleton instance
export const categoryService = new CategoryService();

// Export mock data for direct access if needed
export const mockCategoriesData = mockCategories;

// Export default for easier imports
export default categoryService;