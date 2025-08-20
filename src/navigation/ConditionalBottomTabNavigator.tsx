import React from 'react';
import { useProfile } from '../context/ProfileContext';
import BottomTabNavigator from './BottomTabNavigator';
import KidsBottomTabNavigator from './KidsBottomTabNavigator';

export default function ConditionalBottomTabNavigator() {
  const { isKidsProfile } = useProfile();
  
  // Se for perfil kids (Antônia ou Maria), mostra KidsBottomTabNavigator
  // Senão, mostra BottomTabNavigator normal
  return isKidsProfile() ? <KidsBottomTabNavigator /> : <BottomTabNavigator />;
}
