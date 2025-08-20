import React from 'react';
import { useProfile } from '../context/ProfileContext';
import CategoriesScreen from '../screens/CategoriesScreen';
import KidsCategoriesScreen from '../screens/KidsCategoriesScreen';

export default function ConditionalCategoriesScreen() {
  const { isKidsProfile } = useProfile();
  
  // Se for perfil kids (Antônia ou Maria), mostra KidsCategoriesScreen
  // Senão, mostra CategoriesScreen normal
  return isKidsProfile() ? <KidsCategoriesScreen /> : <CategoriesScreen />;
}
