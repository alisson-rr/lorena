import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoreLogo from '../components/LoreLogo';
import { fonts, fontWeights } from '../utils/fonts';
import { RootStackParamList } from '../navigation/types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../assets/background-model.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <LinearGradient
          colors={['rgba(156, 0, 226, 0)', 'rgba(156, 0, 226, 0.5)', 'rgba(156, 0, 226, 0.9)', 'rgb(156, 0, 226)']}
          locations={[0.43362, 0.5469, 0.66017, 0.94336]}
          style={styles.gradient}
        >
          {/* Status Bar Area */}
          <View style={styles.statusBarArea} />
          
          <View style={styles.content}>
            <View style={styles.topSection}>
              <View style={styles.header}>
                <LoreLogo />
              </View>

              <View style={styles.mainImageContainer}>
                {/* Empty space for main image - transparent in design */}
              </View>
            </View>

            <View style={styles.bottomSection}>
              <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    BEM-VINDO(A) AO{'\n'}LORE IN PLAY!
                  </Text>
                  <Text style={styles.subtitle}>
                    Descubra conteúdos exclusivos e mergulhe{'\n'}no universo da Lore.
                  </Text>
                </View>

                <View style={styles.dotsContainer}>
                  <View style={[styles.dot, styles.dotActive]} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                </View>
              </View>

              <View style={styles.buttonGroup}>
                <TouchableOpacity 
                  style={styles.primaryButton} 
                  activeOpacity={0.8}
                  onPress={handleSignUp}
                >
                  <Text style={styles.primaryButtonText}>Cadastre-se</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.secondaryButton} 
                  activeOpacity={0.8}
                  onPress={handleLogin}
                >
                  <Text style={styles.secondaryButtonText}>Acessar minha conta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Image
            source={require('../assets/elementos-03.png')}
            style={styles.decorElement1}
          />
          <Image
            source={require('../assets/elementos-04.png')}
            style={styles.decorElement2}
          />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1E1DD',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
  },
  statusBarArea: {
    height: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24,
    opacity: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
    width: '100%',
  },
  bottomSection: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  mainImageContainer: {
    height: 200, // Reduced height to push content down
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // Remove background placeholder - transparent in design
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 0,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    maxWidth: 343,
  },
  title: {
    fontFamily: fonts.anton,
    fontSize: 32,
    color: '#F0EBEA',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 38.4, // 1.2 line height as per Figma
    marginBottom: 16,
    width: '100%',
  },
  subtitle: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#F0EBEA',
    textAlign: 'center',
    lineHeight: 24, // 1.5 line height as per Figma
    width: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    width: 36,
    height: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(90, 242, 180, 0.3)',
  },
  dotActive: {
    backgroundColor: '#5AF2B4',
  },
  buttonGroup: {
    width: '100%',
    gap: 24,
    paddingHorizontal: 0,
  },
  primaryButton: {
    backgroundColor: '#5AF2B4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  primaryButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#252525',
    lineHeight: 24,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#5AF2B4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#5AF2B4',
    lineHeight: 24,
  },
  decorElement1: {
    position: 'absolute',
    width: 170,
    height: 170,
    left: 264, // Positioned from left as per Figma
    top: 219,
    resizeMode: 'contain',
  },
  decorElement2: {
    position: 'absolute',
    width: 202,
    height: 202,
    left: -41,
    top: 41,
    resizeMode: 'contain',
  },
});