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

type LeadDataScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LeadData'>;

export default function LeadDataScreen() {
  const navigation = useNavigation<LeadDataScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [isFanClubMember, setIsFanClubMember] = useState(false);
  const [fanClubName, setFanClubName] = useState('');
  const [genderModal, setGenderModal] = useState(false);
  const [monthModal, setMonthModal] = useState(false);
  const [yearModal, setYearModal] = useState(false);
  const [stateModal, setStateModal] = useState(false);

  const genderOptions = ['Feminino', 'Masculino', 'Prefiro não dizer'];
  const monthOptions = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const stateOptions = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
  const yearOptions = Array.from({ length: 90 }, (_, i) => `${2024 - i}`);

  const handleContinue = () => {
    console.log('Lead data:', {
      name,
      email,
      gender,
      birthDate: `${day}/${month}/${year}`,
      state,
      city,
      isFanClubMember,
      fanClubName: isFanClubMember ? fanClubName : null,
    });
    // Navigate to next screen
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
            {/* Header with Logo */}
            <View style={styles.header}>
              <LoreLogo />
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {/* Title and Subtitle */}
              <View style={styles.titleSection}>
                <Text style={styles.title}>FALTA POUCO!</Text>
                <Text style={styles.subtitle}>
                  Só mais algumas informações para te conhecermos melhor.
                </Text>
              </View>

              <View style={styles.formFields}>
                {/* Name Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nome</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    placeholderTextColor="#D8BFC4"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="email@email.com"
                    placeholderTextColor="#D8BFC4"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Gender Dropdown */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Gênero</Text>
                  <TouchableOpacity style={styles.dropdownInput} onPress={() => setGenderModal(true)}>
                    <Text style={styles.placeholderText}>
                      {gender || 'Selecione'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#D8BFC4" />
                  </TouchableOpacity>
                </View>

                {/* Birth Date */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Data de nascimento</Text>
                  <View style={styles.dateRow}>
                    <TextInput
                      style={[styles.dateInput, styles.dateInputSmall]}
                      placeholder="Dia"
                      placeholderTextColor="#D8BFC4"
                      value={day}
                      onChangeText={setDay}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                    <TouchableOpacity style={styles.dateInputDropdown} onPress={() => setMonthModal(true)}>
                      <Text style={styles.placeholderText}>
                        {month || 'Mês'}
                      </Text>
                      <Ionicons name="chevron-down" size={16} color="#D8BFC4" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateInputDropdown} onPress={() => setYearModal(true)}>
                      <Text style={styles.placeholderText}>
                        {year || 'Ano'}
                      </Text>
                      <Ionicons name="chevron-down" size={16} color="#D8BFC4" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* State Dropdown */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Estado</Text>
                  <TouchableOpacity style={styles.dropdownInput} onPress={() => setStateModal(true)}>
                    <Text style={styles.placeholderText}>
                      {state || 'Selecione'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#D8BFC4" />
                  </TouchableOpacity>
                </View>

                {/* City Input */}
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

                {/* Fan Club Checkbox */}
                <TouchableOpacity 
                  style={styles.checkboxRow}
                  onPress={() => {
                    const newValue = !isFanClubMember;
                    setIsFanClubMember(newValue);
                    // Limpa o nome do fã-clube quando desmarca o checkbox
                    if (!newValue) {
                      setFanClubName('');
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.checkbox}>
                    {isFanClubMember && (
                      <Ionicons name="checkmark" size={16} color="#9C00E2" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    Faz parte de algum fã clube?
                  </Text>
                </TouchableOpacity>

                {/* Fan Club Name Input - Only visible when checkbox is checked */}
                {isFanClubMember && (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Qual é o fã-clube?</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Digite o nome do fã-clube"
                      placeholderTextColor="#D8BFC4"
                      value={fanClubName}
                      onChangeText={setFanClubName}
                      autoCapitalize="words"
                    />
                  </View>
                )}
              </View>

              {/* Continue Button */}
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
                activeOpacity={0.8}
              >
                <Text style={styles.continueButtonText}>Continuar</Text>
              </TouchableOpacity>
            </View>

            {/* Modals */}
            <Modal transparent visible={genderModal} animationType="fade" onRequestClose={() => setGenderModal(false)}>
              <View style={styles.modalBackdrop}>
                <View style={styles.modalContent}>
                  {genderOptions.map((opt) => (
                    <TouchableOpacity key={opt} style={styles.modalItem} onPress={() => { setGenderModal(false); setGender(opt); }}>
                      <Text style={styles.modalItemText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>

            <Modal transparent visible={monthModal} animationType="fade" onRequestClose={() => setMonthModal(false)}>
              <View style={styles.modalBackdrop}>
                <View style={styles.modalContent}>
                  {monthOptions.map((opt, idx) => (
                    <TouchableOpacity key={opt} style={styles.modalItem} onPress={() => { setMonthModal(false); setMonth(`${idx + 1}`.padStart(2, '0')); }}>
                      <Text style={styles.modalItemText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>

            <Modal transparent visible={yearModal} animationType="fade" onRequestClose={() => setYearModal(false)}>
              <View style={styles.modalBackdrop}>
                <View style={styles.modalContent}>
                  <ScrollView>
                    {yearOptions.map((opt) => (
                      <TouchableOpacity key={opt} style={styles.modalItem} onPress={() => { setYearModal(false); setYear(opt); }}>
                        <Text style={styles.modalItemText}>{opt}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>

            <Modal transparent visible={stateModal} animationType="fade" onRequestClose={() => setStateModal(false)}>
              <View style={styles.modalBackdrop}>
                <View style={styles.modalContent}>
                  <ScrollView>
                    {stateOptions.map((opt) => (
                      <TouchableOpacity key={opt} style={styles.modalItem} onPress={() => { setStateModal(false); setState(opt); }}>
                        <Text style={styles.modalItemText}>{opt}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
            </View>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'center',
    gap: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  formSection: {
    width: '100%',
    maxWidth: 343,
    gap: 32,
  },
  titleSection: {
    gap: 8,
    marginBottom: 23,
  },
  title: {
    fontFamily: 'Anton',
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 38,
  },
  subtitle: {
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#F0EBEA',
    textAlign: 'center',
    lineHeight: 24,
  },
  formFields: {
    gap: 16,
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

  placeholderText: {
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#D8BFC4',
    flex: 1,
  },
  dropdownInput: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#F1E1DD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dateInput: {
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
    width: '30%',
    textAlign: 'center',
  },
  dateInputSmall: {
    textAlign: 'center',
  },
  dateInputDropdown: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#F1E1DD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '30%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxLabel: {
    fontFamily: 'Almarai',
    fontSize: 12,
    color: '#F0EBEA',
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 343,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingVertical: 8,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modalItemText: {
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#F0EBEA',
  },
  continueButton: {
    backgroundColor: '#5AF2B4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  continueButtonText: {
    fontFamily: 'Almarai-Bold',
    fontSize: 16,
    color: '#252525',
    lineHeight: 24,
  },
});