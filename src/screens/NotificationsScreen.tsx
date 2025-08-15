import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { HOME_GRADIENT } from '../styles/gradients';
import InfoIcon from '../components/icons/InfoIcon';
import NotificationDetailDialog from '../components/NotificationDetailDialog';

interface Notification {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  isRead: boolean;
  image?: string;
  link?: string;
}

// Mock notifications data
const newNotifications: Notification[] = [
  {
    id: '1',
    title: 'Título da notificação com imagem',
    date: '02/04/2024',
    time: '10:40',
    description: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra, lectus at fringilla varius, sapien turpis elementum lectus at fringilla varius, sapien it amet, consectetur adipiscing elit.',
    isRead: false,
    image: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400&h=300&fit=crop',
    link: 'https://www.example.com/notification1',
  },
  {
    id: '2',
    title: 'Olá, Charles Muzykant Pereira',
    date: '02/04/2024',
    time: '10:40',
    description: 'Dentro do período estipulado de 2.30 min, o perfil infantil Clara maria assistiu aos seguintes conteúdos. Você pode verificar o relatório completo acessando o painel de controle parental.',
    isRead: false,
    // No image, no link for this notification
  },
  {
    id: '3',
    title: 'Nova live disponível',
    date: '02/04/2024',
    time: '10:40',
    description: 'Uma nova live está disponível no canal. Não perca a oportunidade de assistir ao conteúdo exclusivo preparado especialmente para você.',
    isRead: false,
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=300&fit=crop',
    // Has image but no link
  },
];

const readNotifications: Notification[] = [
  {
    id: '4',
    title: 'Notificação anterior',
    date: '01/04/2024',
    time: '14:30',
    description: 'Esta é uma notificação que já foi lida anteriormente. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isRead: true,
    link: 'https://www.example.com/old-notification',
    // Has link but no image
  },
  {
    id: '5',
    title: 'Atualização do sistema',
    date: '01/04/2024',
    time: '09:15',
    description: 'O sistema foi atualizado com sucesso. Novas funcionalidades foram adicionadas para melhorar sua experiência.',
    isRead: true,
    // No image, no link
  },
];

interface NotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

const NotificationItem = ({ notification, onPress }: NotificationItemProps) => {
  return (
    <TouchableOpacity 
      style={styles.notificationCard} 
      onPress={() => onPress(notification)}
      activeOpacity={0.7}
    >
      {/* Unread indicator */}
      {!notification.isRead && (
        <View style={styles.unreadIndicator} />
      )}
      
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationDate}>
          {notification.date} · {notification.time}
        </Text>
        <Text style={styles.notificationDescription} numberOfLines={3}>
          {notification.description}
        </Text>
      </View>
      
      <TouchableOpacity style={styles.infoButton}>
        <InfoIcon size={18} color="#6C6A6A" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default function NotificationsScreen() {
  const navigation = useAppNavigation();
  const [activeTab, setActiveTab] = useState<'new' | 'read'>('new');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [detailDialogVisible, setDetailDialogVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNotificationPress = (notification: Notification) => {
    setSelectedNotification(notification);
    setDetailDialogVisible(true);
  };

  const handleCloseDetailDialog = () => {
    setDetailDialogVisible(false);
    // Small delay before clearing to allow animation to complete
    setTimeout(() => {
      setSelectedNotification(null);
    }, 300);
  };

  const notifications = activeTab === 'new' ? newNotifications : readNotifications;

  return (
    <LinearGradient
      colors={HOME_GRADIENT.colors}
      start={HOME_GRADIENT.start}
      end={HOME_GRADIENT.end}
      locations={HOME_GRADIENT.locations}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Ionicons name="chevron-back" size={28} color="#69162B" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Notificações</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'new' && styles.activeTab]}
          onPress={() => setActiveTab('new')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'new' && styles.activeTabText]}>
            Novas
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'read' && styles.activeTab]}
          onPress={() => setActiveTab('read')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'read' && styles.activeTabText]}>
            Lidas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onPress={handleNotificationPress}
          />
        ))}
        
        {notifications.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'new' 
                ? 'Você não tem novas notificações' 
                : 'Você não tem notificações lidas'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Notification Detail Dialog */}
      {selectedNotification && (
        <NotificationDetailDialog
          visible={detailDialogVisible}
          onClose={handleCloseDetailDialog}
          title={selectedNotification.title}
          date={selectedNotification.date}
          time={selectedNotification.time}
          description={selectedNotification.description}
          image={selectedNotification.image}
          link={selectedNotification.link}
        />
      )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontFamily: 'Roboto Serif',
    fontSize: 24,
    color: '#69162B',
    lineHeight: 28.8,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D8BFC4',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#69162B',
  },
  tabText: {
    fontFamily: 'Almarai',
    fontSize: 16,
    color: 'rgba(105, 22, 43, 0.2)',
    lineHeight: 24,
  },
  activeTabText: {
    color: '#69162B',
    fontFamily: 'Almarai-Bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D8BFC4',
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  unreadIndicator: {
    position: 'absolute',
    left: 16,
    top: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E996AB',
  },
  notificationContent: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 12,
  },
  notificationTitle: {
    fontFamily: 'Almarai-Bold',
    fontSize: 14,
    color: '#69162B',
    lineHeight: 21,
    marginBottom: 4,
  },
  notificationDate: {
    fontFamily: 'Almarai',
    fontSize: 12,
    color: '#8F7E81',
    lineHeight: 18,
    marginBottom: 8,
  },
  notificationDescription: {
    fontFamily: 'Almarai',
    fontSize: 13,
    color: '#4D4847',
    lineHeight: 19.5,
  },
  infoButton: {
    padding: 4,
    alignSelf: 'flex-start',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: 'Almarai',
    fontSize: 16,
    color: '#8F7E81',
    lineHeight: 24,
    textAlign: 'center',
  },
});