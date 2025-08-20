import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';
import { LinearGradient, HOME_GRADIENT, gradientStyle } from '../styles/gradients';
import NotificationIcon from '../components/icons/NotificationIcon';
import FlowerIcon from '../components/icons/FlowerIcon';
import StarIcon from '../components/icons/StarIcon';
import FilterIcon from '../components/icons/FilterIcon';
import FilterDialog from '../components/FilterDialog';
import { useAppNavigation, HistoryScreenNavigationProp } from '../hooks/useAppNavigation';

interface HistoryItemProps {
  date: string;
  time: string;
  title: string;
  profile: 'Maria' | 'Antônia';
  thumbnail: string;
}

const HistoryItem = ({ date, time, title, profile }: HistoryItemProps) => {
  return (
    <View style={styles.historyItem}>
      {/* Thumbnail */}
      <View style={styles.thumbnail}>
        <View style={styles.thumbnailPlaceholder} />
      </View>
      
      {/* Content */}
      <View style={styles.itemContent}>
        <View style={styles.textContent}>
          <Text style={styles.dateTime}>{date} - {time}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        
        {/* User info */}
        <View style={styles.userInfo}>
          <View style={[styles.avatarCircle, { backgroundColor: '#AB4766' }]}>
            {profile === 'Maria' ? (
              <StarIcon size={16} />
            ) : (
              <FlowerIcon size={16} />
            )}
          </View>
          <Text style={styles.profileName}>{profile}</Text>
        </View>
      </View>
    </View>
  );
};

export default function HistoryScreen() {
  const navigation = useAppNavigation<HistoryScreenNavigationProp>();
  const [selectedFilter, setSelectedFilter] = useState('Últimos 7 dias');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>(['Antônia', 'Maria']);

  const filterOptions = [
    { label: 'Último dia', value: 1 },
    { label: 'Últimos 7 dias', value: 7 },
    { label: 'Últimos 15 dias', value: 15 },
    { label: 'Últimos 30 dias', value: 30 },
    { label: 'Últimos 90 dias', value: 90 },
  ];

  const historyItems: HistoryItemProps[] = [
    { date: '15/09/2024', time: '13:52', title: 'Título Episódio', profile: 'Maria', thumbnail: '' },
    { date: '15/09/2024', time: '13:52', title: 'Título Episódio', profile: 'Maria', thumbnail: '' },
    { date: '15/09/2024', time: '13:52', title: 'Título Episódio', profile: 'Maria', thumbnail: '' },
    { date: '15/09/2024', time: '13:52', title: 'Título Episódio', profile: 'Maria', thumbnail: '' },
    { date: '15/09/2024', time: '13:52', title: 'Título Episódio', profile: 'Maria', thumbnail: '' },
    { date: '15/09/2024', time: '13:52', title: 'Título Episódio', profile: 'Antônia', thumbnail: '' },
    { date: '15/09/2024', time: '13:52', title: 'Título Episódio', profile: 'Antônia', thumbnail: '' },
    { date: '15/09/2024', time: '13:52', title: 'Título Episódio', profile: 'Antônia', thumbnail: '' },
    { date: '15/09/2024', time: '13:52', title: 'Título Episódio', profile: 'Antônia', thumbnail: '' },
  ];

  const handleApplyFilter = (profiles: string[]) => {
    setSelectedProfiles(profiles);
  };

  const filteredHistoryItems = historyItems.filter(item => 
    selectedProfiles.includes(item.profile)
  );

  return (
    <LinearGradient
      style={gradientStyle}
      colors={HOME_GRADIENT.colors}
      locations={HOME_GRADIENT.locations}
      start={HOME_GRADIENT.start}
      end={HOME_GRADIENT.end}
    >
      <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#69162B" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications')}
          activeOpacity={0.7}
        >
          <NotificationIcon />
        </TouchableOpacity>
      </View>

      {/* Page Title */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Histórico</Text>
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <View style={styles.dropdownWrapper}>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setShowFilterDropdown(!showFilterDropdown)}
            activeOpacity={0.7}
          >
            <Text style={styles.dropdownText}>{selectedFilter}</Text>
            <Ionicons 
              name={showFilterDropdown ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="#69162B" 
            />
          </TouchableOpacity>
          
          {showFilterDropdown && (
            <View style={styles.dropdownMenu}>
              {filterOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownOption,
                    index === filterOptions.length - 1 && styles.lastDropdownOption
                  ]}
                  onPress={() => {
                    setSelectedFilter(option.label);
                    setShowFilterDropdown(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text 
                    style={[
                      styles.dropdownOptionText,
                      selectedFilter === option.label && styles.selectedOptionText
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={styles.filterButton} 
          activeOpacity={0.7}
          onPress={() => setShowFilterDialog(true)}
        >
          <Text style={styles.filterButtonText}>Filtro</Text>
          <FilterIcon size={20} color="#69162B" />
        </TouchableOpacity>
      </View>

      {/* History List */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredHistoryItems.map((item, index) => (
          <HistoryItem key={index} {...item} />
        ))}
      </ScrollView>

      {/* Filter Dialog */}
      <FilterDialog 
        visible={showFilterDialog}
        onClose={() => setShowFilterDialog(false)}
        onApplyFilter={handleApplyFilter}
      />
    </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  notificationButton: {
    padding: 8,
  },
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  pageTitle: {
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 24,
    color: '#69162B',
    textAlign: 'left',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
    zIndex: 1000,
  },
  dropdownWrapper: {
    flex: 1,
    position: 'relative',
  },
  dropdownButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#69162B',
    height: 48,
  },
  dropdownText: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#69162B',
    lineHeight: 24,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#69162B',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EBEA',
  },
  lastDropdownOption: {
    borderBottomWidth: 0,
  },
  dropdownOptionText: {
    fontFamily: fonts.almarai,
    fontSize: 16,
    color: '#69162B',
    lineHeight: 24,
  },
  selectedOptionText: {
    fontFamily: fonts.almaraiBold,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    height: 48,
  },
  filterButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#69162B',
    lineHeight: 24,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    gap: 12,
  },
  thumbnail: {
    width: 124,
    height: 78,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D8BFC4',
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8E0DD',
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  textContent: {
    gap: 4,
  },
  dateTime: {
    fontFamily: fonts.almarai,
    fontSize: 13,
    color: '#4D4847',
    lineHeight: 18,
  },
  title: {
    fontFamily: fonts.almaraiBold,
    fontSize: 13,
    color: '#69162B',
    lineHeight: 18,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  avatarCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontFamily: fonts.almaraiBold,
    fontSize: 13,
    color: '#69162B',
    lineHeight: 18,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#F1E1DD',
    borderTopWidth: 1,
    borderTopColor: '#D8BFC4',
    paddingTop: 12,
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    width: 57,
  },
  navLabel: {
    fontFamily: fonts.almaraiBold,
    fontSize: 12,
    color: '#8F7E81',
  },
  navLabelActive: {
    color: '#69162B',
  },

});