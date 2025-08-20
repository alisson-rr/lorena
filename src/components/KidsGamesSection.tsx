import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../utils/fonts';

interface Game {
  id: string;
  title: string;
  thumbnail: string;
  ageRating?: string;
  isPremium?: boolean;
  viewCount?: number;
}

interface KidsGamesSectionProps {
  onGamePress: (gameId: string) => void;
  onSeeMore: () => void;
}

// Dados dos jogos (mesmos da tela de categorias)
const gamesData: Game[] = [
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
];

const GameCard = ({ game, onPress }: { game: Game; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.gameCard}>
    <Image 
      source={{ uri: game.thumbnail }} 
      style={styles.gameImage}
      resizeMode="cover"
    />
    <Text style={styles.gameTitle} numberOfLines={2}>
      Espaço para o título do jogo
    </Text>
  </TouchableOpacity>
);

export default function KidsGamesSection({ 
  onGamePress,
  onSeeMore 
}: KidsGamesSectionProps) {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Jogos</Text>
        
        <TouchableOpacity 
          style={styles.seeMoreButton}
          onPress={onSeeMore}
          activeOpacity={0.7}
        >
          <Text style={styles.seeMoreText}>Ver mais</Text>
          <Ionicons name="chevron-forward" size={24} color="#69162B" />
        </TouchableOpacity>
      </View>

      {/* Games Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {gamesData.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onPress={() => onGamePress(game.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 18,
    color: '#69162B',
    lineHeight: 21.6, // 1.2 * 18
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D2C8E3', // Cor customizada para kids
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
  gameCard: {
    width: 140,
    marginRight: 8,
  },
  gameImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  gameTitle: {
    fontFamily: 'Almarai-Bold',
    fontSize: 14,
    color: '#69162B',
    marginTop: 8,
    lineHeight: 18,
  },
});
