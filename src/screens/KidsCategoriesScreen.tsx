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
import KidsLogo from '../components/KidsLogo';
import { KIDS_HOME_GRADIENT } from '../styles/gradients';
import MenuIcon from '../components/icons/MenuIcon';
import KidsSidebar from '../components/KidsSidebar';
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

export default function KidsCategoriesScreen() {
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
    navigation.navigate('KidsVideoDetail', {
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
        colors={KIDS_HOME_GRADIENT.colors}
        start={KIDS_HOME_GRADIENT.start}
        end={KIDS_HOME_GRADIENT.end}
        locations={KIDS_HOME_GRADIENT.locations}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
        <KidsSidebar 
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
            <KidsLogo width={120} height={40} />
          </View>
          {/* Espaço vazio para manter o logo centralizado */}
          <View style={styles.notificationButton} />
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#AB4766" />
        </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={KIDS_HOME_GRADIENT.colors}
      start={KIDS_HOME_GRADIENT.start}
      end={KIDS_HOME_GRADIENT.end}
      locations={KIDS_HOME_GRADIENT.locations}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Sidebar */}
        <KidsSidebar 
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
          <KidsLogo width={120} height={40} />
        </View>
        
        {/* Espaço vazio para manter o logo centralizado */}
        <View style={styles.notificationButton} />
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
            colors={['#AB4766']}
            tintColor="#AB4766"
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
    width: 32, // Mesmo tamanho do botão de menu para manter simetria
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
    color: '#AB4766', // Cor kids
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
    color: '#AB4766', // Cor kids
    lineHeight: 21.6, // 1.2 * 18
    flex: 1,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D2C8E3', // Cor kids para botões "Ver mais"
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
    backgroundColor: '#D2C8E3', // Cor kids
  },
  tallImage: {
    width: 124,
    height: 180,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#AB4766', // Cor kids
    backgroundColor: '#D2C8E3', // Cor kids
  },
  itemTitle: {
    fontFamily: 'Almarai-Bold',
    fontSize: 13,
    color: '#AB4766', // Cor kids
    lineHeight: 19.5, // 1.5 * 13
    width: 124,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
