import React from 'react';
import { useProfile } from '../context/ProfileContext';
import HomeScreen from '../screens/HomeScreen';
import KidsHomeScreen from '../screens/KidsHomeScreen';

export default function ConditionalHomeScreen() {
  const { isKidsProfile } = useProfile();
  
  // Se for perfil kids (Antônia ou Maria), mostra KidsHomeScreen
  // Senão, mostra HomeScreen normal
  return isKidsProfile() ? <KidsHomeScreen /> : <HomeScreen />;
}
