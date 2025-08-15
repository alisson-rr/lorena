import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts, fontWeights } from '../utils/fonts';
import NewLogo from '../components/NewLogo';
import { HOME_GRADIENT } from '../styles/gradients';
import MenuIcon from '../components/icons/MenuIcon';
import NotificationIcon from '../components/icons/NotificationIcon';
import Sidebar from '../components/Sidebar';
import { Ionicons } from '@expo/vector-icons';
import { useAppNavigation, CategoriesScreenNavigationProp } from '../hooks/useAppNavigation';
import { Category, CategoryItem } from '../types/category';
import { categoryService } from '../services/categoryService';

interface CategoryItemComponentProps {
  item: CategoryItem;
  isSquare?: boolean;
  onPress: () => void;
}

const CategoryItemComponent = ({ item, isSquare = false, onPress }: CategoryItemComponentProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.categoryItem}>
        <Image 
          source={{ uri: item.thumbnail }} 
          style={isSquare ? styles.squareImage : styles.tallImage}
          resizeMode="cover"
        />
        <Text style={styles.itemTitle} numberOfLines={2}>
          {isSquare ? 'Espaço para o título do jogo' : 'Espaço para o título do vídeo'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface CategorySectionProps {
  category: Category;
  onItemPress: (item: CategoryItem) => void;
  onSeeMore: (category: Category) => void;
}

const CategorySection = ({ category, onItemPress, onSeeMore }: CategorySectionProps) => {
  const isSquare = category.type === 'games';
  
  return (
    <View style={styles.categorySection}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{category.name}</Text>
        
        <TouchableOpacity 
          style={styles.seeMoreButton}
          onPress={() => onSeeMore(category)}
          activeOpacity={0.7}
        >
          <Text style={styles.seeMoreText}>Ver mais</Text>
          <Ionicons name="chevron-forward" size={24} color="#69162B" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {category.items.slice(0, 5).map((item) => (
          <CategoryItemComponent
            key={item.id}
            item={item}
            isSquare={isSquare}
            onPress={() => onItemPress(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default function CategoriesScreen() {
  const navigation = useAppNavigation<CategoriesScreenNavigationProp>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      // Show only the categories that match Figma design
      const filteredCategories = response.categories.filter(cat => 
        cat.name === 'Jogos' || cat.name === 'Nome Categoria'
      );
      
      // Rename other categories to "Nome Categoria" to match Figma
      const figmaCategories = [
        response.categories.find(c => c.name === 'Jogos'),
        ...response.categories.filter(c => c.name !== 'Jogos').slice(0, 4).map(c => ({
          ...c,
          name: 'Nome Categoria'
        }))
      ].filter(Boolean) as Category[];
      
      setCategories(figmaCategories);
    } catch (err) {
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadCategories();
  };

  const handleItemPress = (item: CategoryItem) => {
    navigation.navigate('VideoDetail', {
      videoId: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
    });
  };

  const handleSeeMore = (category: Category) => {
    navigation.navigate('CategoryDetail', {
      categoryId: category.id,
      categoryName: category.name,
    });
  };

  // Render loading state
  if (loading) {
    return (
      <LinearGradient
        colors={HOME_GRADIENT.colors}
        start={HOME_GRADIENT.start}
        end={HOME_GRADIENT.end}
        locations={HOME_GRADIENT.locations}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
        <Sidebar 
          visible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
        />
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => setSidebarVisible(true)}
          >
            <MenuIcon />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <NewLogo width={120} height={40} />
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <NotificationIcon />
          </TouchableOpacity>
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#69162B" />
        </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={HOME_GRADIENT.colors}
      start={HOME_GRADIENT.start}
      end={HOME_GRADIENT.end}
      locations={HOME_GRADIENT.locations}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Sidebar */}
        <Sidebar 
          visible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
        />
        
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setSidebarVisible(true)}
        >
          <MenuIcon />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <NewLogo width={120} height={40} />
        </View>
        
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <NotificationIcon />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#69162B']}
            tintColor="#69162B"
          />
        }
      >
        {/* Page Title */}
        <Text style={styles.pageTitle}>Categorias</Text>

        {/* Render categories */}
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            onItemPress={handleItemPress}
            onSeeMore={handleSeeMore}
          />
        ))}
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
  menuButton: {
    padding: 4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingTop: 12,
    paddingBottom: 40,
  },
  pageTitle: {
    fontFamily: 'Roboto Serif',
    fontSize: 24,
    color: '#69162B',
    lineHeight: 28.8, // 1.2 * 24
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categorySection: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'Roboto Serif',
    fontSize: 18,
    color: '#69162B',
    lineHeight: 21.6, // 1.2 * 18
    flex: 1,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D8BFC4',
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    height: 42,
  },
  seeMoreText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 14,
    color: '#69162B',
    lineHeight: 21, // 1.5 * 14
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryItem: {
    marginRight: 12,
    gap: 8,
  },
  squareImage: {
    width: 124,
    height: 124,
    borderRadius: 6,
    backgroundColor: '#E8E0DD',
  },
  tallImage: {
    width: 124,
    height: 180,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D8BFC4',
    backgroundColor: '#E8E0DD',
  },
  itemTitle: {
    fontFamily: 'Almarai-Bold',
    fontSize: 13,
    color: '#69162B',
    lineHeight: 19.5, // 1.5 * 13
    width: 124,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});