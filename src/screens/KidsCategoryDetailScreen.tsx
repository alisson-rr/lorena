import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { KIDS_HOME_GRADIENT } from '../styles/gradients';
import categoryService from '../services/categoryService';
import { CategoryItem } from '../types/category';

type KidsCategoryDetailRouteParams = {
  CategoryDetail: {
    categoryId: string;
    categoryName: string;
  };
};

export default function KidsCategoryDetailScreen() {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<KidsCategoryDetailRouteParams, 'CategoryDetail'>>();
  const { categoryId, categoryName } = route.params || { categoryId: '', categoryName: 'Nome da Categoria' };

  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategoryItems();
  }, [categoryId, sortBy]);

  useEffect(() => {
    searchItems();
  }, [searchText]);

  const loadCategoryItems = async (page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) {
        setIsLoading(true);
        setError(null);
      } else {
        setIsLoadingMore(true);
      }

      const response = await categoryService.sortCategoryItems(
        categoryId,
        sortBy,
        page,
        21 // Load 21 items (7 rows of 3)
      );

      if (append) {
        setItems(prev => [...prev, ...response.items]);
      } else {
        setItems(response.items);
      }
      
      setTotalCount(response.totalCount);
      setCurrentPage(response.currentPage);
      setHasMore(response.currentPage < response.totalPages);
    } catch (error) {
      console.error('Error loading category items:', error);
      setError('Erro ao carregar itens. Tente novamente.');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const searchItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await categoryService.searchCategoryItemsDetailed(
        categoryId,
        searchText
      );
      
      setItems(response.items);
      setTotalCount(response.totalCount);
    } catch (error) {
      console.error('Error searching items:', error);
      setError('Erro ao buscar itens. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      loadCategoryItems(currentPage + 1, true);
    }
  };

  const handleRetry = () => {
    setError(null);
    loadCategoryItems();
  };

  const handleSortChange = (newSortBy: 'recent' | 'popular') => {
    setSortBy(newSortBy);
    setShowSortMenu(false);
    setCurrentPage(1);
  };

  const handleItemPress = (item: CategoryItem) => {
    navigation.navigate('KidsVideoDetail', {
      videoId: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
    });
  };

  const renderItem = ({ item, index }: { item: CategoryItem; index: number }) => {
    return (
      <TouchableOpacity 
        style={styles.itemContainer}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.7}
      >
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.itemImage} 
          resizeMode="cover"
        />
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={KIDS_HOME_GRADIENT.colors}
      start={KIDS_HOME_GRADIENT.start}
      end={KIDS_HOME_GRADIENT.end}
      locations={KIDS_HOME_GRADIENT.locations}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#AB4766" />
        </TouchableOpacity>
        
        {/* Espaço vazio para manter simetria */}
        <View style={styles.notificationButton} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        {/* Category Title */}
        <Text style={styles.categoryTitle}>{categoryName}</Text>

        {/* Search and Filter Section */}
        <View style={styles.searchSection}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={24} color="#AB4766" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar"
              placeholderTextColor="#8F7E81"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText ? (
              <TouchableOpacity onPress={handleClearSearch}>
                <Ionicons name="close" size={24} color="#AB4766" />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Results and Sort */}
          <View style={styles.resultsRow}>
            <Text style={styles.resultsText}>
              {totalCount} resultados
            </Text>
            
            <TouchableOpacity 
              style={styles.sortButton}
              onPress={() => setShowSortMenu(!showSortMenu)}
              activeOpacity={0.7}
            >
              <Text style={styles.sortButtonText}>
                {sortBy === 'recent' ? 'Mais recentes' : 'Mais populares'}
              </Text>
              <Ionicons 
                name="chevron-down" 
                size={24} 
                color="#AB4766" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Items Grid */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#AB4766" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={handleRetry}
              activeOpacity={0.8}
            >
              <Text style={styles.retryButtonText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.itemsGrid}>
              {items.map((item, index) => (
                <View key={item.id} style={styles.itemWrapper}>
                  {renderItem({ item, index })}
                </View>
              ))}
            </View>
            
            {/* Load More Button */}
            {hasMore && (
              <View style={styles.loadMoreContainer}>
                {isLoadingMore ? (
                  <ActivityIndicator size="small" color="#AB4766" />
                ) : (
                  <TouchableOpacity 
                    style={styles.loadMoreButton}
                    onPress={handleLoadMore}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.loadMoreText}>Carregar mais</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </>
        )}
      </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 4,
  },
  notificationButton: {
    padding: 4,
    width: 32, // Mesmo tamanho para manter simetria
  },
  content: {
    flex: 1,
  },
  categoryTitle: {
    fontFamily: 'Roboto Serif',
    fontSize: 24,
    color: '#AB4766', // Cor kids
    lineHeight: 28.8, // 1.2 * 24
    marginTop: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1.5,
    borderColor: '#AB4766', // Cor kids
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 48,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#252525',
    lineHeight: 24, // 1.5 * 16
  },
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 0,
  },
  resultsText: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#AB4766', // Cor kids
    lineHeight: 24, // 1.5 * 16
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
    height: 42,
  },
  sortButtonText: {
    fontFamily: fonts.almaraiBold,
    fontWeight: fontWeights.bold,
    fontSize: 14,
    color: '#AB4766', // Cor kids
    lineHeight: 21, // 1.5 * 14
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  itemWrapper: {
    width: '31%', // Melhor distribuição (100% - 24px) / 3
  },
  itemContainer: {
    width: '100%',
    marginBottom: 20,
  },
  itemImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    backgroundColor: '#D2C8E3', // Cor kids
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#AB4766', // Cor kids
  },
  itemTitle: {
    fontFamily: fonts.almaraiBold,
    fontWeight: fontWeights.bold,
    fontSize: 13,
    color: '#AB4766', // Cor kids
    lineHeight: 19.5, // 1.5 * 13
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  errorText: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#AB4766', // Cor kids
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#AB4766', // Cor kids
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    fontFamily: fonts.almaraiBold,
    fontWeight: fontWeights.bold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  loadMoreContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#D2C8E3', // Cor kids para botão "Carregar mais"
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  loadMoreText: {
    fontFamily: fonts.almaraiBold,
    fontWeight: fontWeights.bold,
    fontSize: 14,
    color: '#AB4766', // Cor kids
  },
});
