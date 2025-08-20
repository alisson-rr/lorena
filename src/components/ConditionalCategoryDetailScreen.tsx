import React from 'react';
import { useProfile } from '../context/ProfileContext';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import KidsCategoryDetailScreen from '../screens/KidsCategoryDetailScreen';

export default function ConditionalCategoryDetailScreen() {
  const { isKidsProfile } = useProfile();
  
  // Se for perfil kids (Antônia ou Maria), mostra KidsCategoryDetailScreen
  // Senão, mostra CategoryDetailScreen normal
  return isKidsProfile() ? <KidsCategoryDetailScreen /> : <CategoryDetailScreen />;
}
