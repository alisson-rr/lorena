import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoreLogo from '../components/LoreLogo';
import { fonts, fontWeights } from '../utils/fonts';
import { RootStackParamList } from '../navigation/types';
import { LinearGradient, PRIMARY_GRADIENT, gradientStyle } from '../styles/gradients';

type MissingDataScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MissingData'>;

export default function MissingDataScreen() {
  const navigation = useNavigation<MissingDataScreenNavigationProp>();
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [isFanClubMember, setIsFanClubMember] = useState(false);
  const [fanClubName, setFanClubName] = useState('');

  // Modal states
  const [stateModal, setStateModal] = useState(false);

  // Options
  const stateOptions = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

  const handleContinue = () => {
    console.log('Missing data:', {
      state,
      city,
      isFanClubMember,
      fanClubName,
    });
    navigation.navigate('SetPassword');
  };

  return (
    <LinearGradient
      style={gradientStyle}
      colors={PRIMARY_GRADIENT.colors}
      locations={PRIMARY_GRADIENT.locations}
      start={PRIMARY_GRADIENT.start}
      end={PRIMARY_GRADIENT.end}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header com Logo */}
            <View style={styles.header}>
              <LoreLogo />
            </View>

            {/* Título e Subtítulo */}
            <View style={styles.titleSection}>
              <Text style={styles.title}>FALTA POUCO!</Text>
              <Text style={styles.subtitle}>
                Só mais algumas informações para te conhecermos melhor.
              </Text>
            </View>

            {/* Formulário */}
            <View style={styles.formSection}>
              
              {/* Estado */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Estado</Text>
                <TouchableOpacity style={styles.dropdown} onPress={() => setStateModal(true)}>
                  <Text style={[styles.dropdownText, !state && styles.placeholder]}>
                    {state || 'Selecione'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#F1E1DD" />
                </TouchableOpacity>
              </View>

              {/* Cidade */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cidade</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite o nome da sua cidade"
                  placeholderTextColor="#D8BFC4"
                  value={city}
                  onChangeText={setCity}
                />
              </View>

              {/* Checkbox Fã clube */}
              <View style={styles.checkboxContainer}>
                <TouchableOpacity 
                  style={styles.checkboxRow}
                  onPress={() => setIsFanClubMember(!isFanClubMember)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, isFanClubMember && styles.checkboxChecked]}>
                    {isFanClubMember && (
                      <Ionicons name="checkmark" size={16} color="#282B36" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    Faz parte de algum fã clube?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Campo condicional - Nome do fã clube */}
              {isFanClubMember && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Qual é o fã clube?</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do fã clube"
                    placeholderTextColor="#D8BFC4"
                    value={fanClubName}
                    onChangeText={setFanClubName}
                  />
                </View>
              )}

            </View>

            {/* Botão Continuar */}
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.continueButtonText}>Continuar</Text>
            </TouchableOpacity>

          </View>

          {/* Modal Estado */}
          <Modal transparent visible={stateModal} animationType="fade" onRequestClose={() => setStateModal(false)}>
            <View style={styles.modalBackdrop}>
              <View style={styles.modalContent}>
                <ScrollView style={styles.modalScrollView}>
                  {stateOptions.map((opt) => (
                    <TouchableOpacity key={opt} style={styles.modalItem} onPress={() => { setStateModal(false); setState(opt); }}>
                      <Text style={styles.modalItemText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>

        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingVertical: 24,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Anton',
    fontSize: 32,
    color: '#F0EBEA',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
    lineHeight: 38,
  },
  subtitle: {
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#F0EBEA',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 343,
  },
  formSection: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 24,
    marginBottom: 64,
  },
  inputGroup: {
    gap: 12,
  },
  label: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#F1E1DD',
    lineHeight: 24,
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#F1E1DD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#F0EBEA',
    backgroundColor: 'transparent',
  },
  dropdown: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#F1E1DD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  dropdownText: {
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#F0EBEA',
  },
  placeholder: {
    color: '#D8BFC4',
  },
  checkboxContainer: {
    gap: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  checkboxChecked: {
    backgroundColor: '#FFFFFF',
    borderColor: '#282B36',
  },
  checkboxLabel: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#FFFFFF',
    flex: 1,
    lineHeight: 14,
  },
  continueButton: {
    backgroundColor: '#5AF2B4',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  continueButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#252525',
    lineHeight: 24,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 343,
    maxHeight: '70%',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 8,
  },
  modalScrollView: {
    maxHeight: 300,
  },
  modalItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalItemText: {
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});