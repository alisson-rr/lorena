import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  useFonts,
  Anton_400Regular 
} from '@expo-google-fonts/anton';
import { 
  Almarai_400Regular,
  Almarai_700Bold 
} from '@expo-google-fonts/almarai';
import RootNavigator from './src/navigation/RootNavigator';
import 'react-native-gesture-handler';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Anton': Anton_400Regular,
    'Almarai': Almarai_400Regular,
    'Almarai-Bold': Almarai_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1E1DD' }}>
        <ActivityIndicator size="large" color="#69162B" />
      </View>
    );
  }

  return <RootNavigator />;
}