import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts } from '../utils/fonts';
import NewLogo from '../components/NewLogo';
import { HOME_GRADIENT } from '../styles/gradients';
import MenuIcon from '../components/icons/MenuIcon';
import NotificationIcon from '../components/icons/NotificationIcon';
import FeedPost from '../components/FeedPost';
import FeedBanner from '../components/FeedBanner';
import CommentsModal from '../components/CommentsModal';
import ReportDialog from '../components/ReportDialog';
import ReportSuccessModal from '../components/ReportSuccessModal';
import Sidebar from '../components/Sidebar';
import { useAppNavigation, FeedScreenNavigationProp } from '../hooks/useAppNavigation';

// Mock data for feed posts matching Figma
const feedPosts = [
  {
    id: '1',
    authorName: 'Lore',
    date: '02/04/2024',
    time: '10:40',
    content: 'Ser bem sucedida no lado pessoal, profissional, maternidade, manter a saúde mental, os laços familiares e ainda lidar com pressão de todos os lados.... são muitos os "pratinhos" para equilibrar.\n\nComo medir o sucesso no meio disso tudo? Acredito que seja com propósito, amor e verdade, me mantendo fiel ao que eu acredito, ao que eu sou e ao que quero transmitir, principalmente, para minha filha. Sou muito grata por poder dizer que encontrei o meu sucesso.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    likes: 248,
    comments: 96,
    isLiked: true,
  },
  {
    id: '2',
    authorName: 'Equipe LP',
    date: '02/04/2024',
    time: '10:40',
    content: 'Tem novidade chegando por aí... 👀 Deixe o seu palpite nos comentários!',
    likes: 248,
    comments: 96,
    isLiked: false,
  },
  {
    id: '3',
    authorName: 'Lore',
    date: '02/04/2024',
    time: '10:40',
    content: 'Quem aí já aprendeu a última coreografia da Lore? Aproveita e conta pra gente qual a próxima música que você quer ver por aqui!',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
    likes: 248,
    comments: 96,
    isLiked: true,
  },
];

// Mock comments data
const mockComments = [
  {
    id: '1',
    author: 'Marina Silva',
    time: '1d',
    content: 'Adorei o post! Muito inspirador, continue compartilhando esses momentos com a gente 💕',
  },
  {
    id: '2',
    author: 'Ana Morais',
    time: '5 min',
    content: 'Que lindo! A Lore está cada dia mais talentosa. Parabéns pelo trabalho incrível!',
  },
  {
    id: '3',
    author: 'Pedro Santos',
    time: '2h',
    content: 'Muito bom! Já estou praticando a coreografia aqui em casa. Mal posso esperar pela próxima!',
  },
  {
    id: '4',
    author: 'Julia Costa',
    time: '30 min',
    content: 'Amei! Vocês são demais! 🎉',
  },
];

// Mock banner data
const bannerImage = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop';

export default function FeedScreen() {
  const navigation = useAppNavigation<FeedScreenNavigationProp>();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [reportDialogVisible, setReportDialogVisible] = useState(false);
  const [reportSuccessModalVisible, setReportSuccessModalVisible] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  const handleLike = (postId: string) => {
    console.log('Liked post:', postId);
  };

  const handleComment = (postId: string) => {
    setSelectedPostId(postId);
    setCommentsModalVisible(true);
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
    Alert.alert('Compartilhar', 'Funcionalidade de compartilhamento em breve!');
  };

  const handleBannerPress = () => {
    console.log('Banner pressed');
  };

  const handleSubmitComment = (comment: string) => {
    console.log('New comment:', comment, 'for post:', selectedPostId);
    // Here you would add the comment to the post
    Alert.alert('Comentário enviado!', 'Seu comentário foi publicado com sucesso.');
  };

  const handleReportComment = (commentId: string) => {
    setSelectedCommentId(commentId);
    setReportDialogVisible(true);
  };

  const handleConfirmReport = () => {
    console.log('Comment reported:', selectedCommentId);
    setReportDialogVisible(false);
    // Show success modal after a brief delay to allow dialog to close
    setTimeout(() => {
      setReportSuccessModalVisible(true);
    }, 300);
  };

  return (
    <LinearGradient
      colors={HOME_GRADIENT.colors}
      start={HOME_GRADIENT.start}
      end={HOME_GRADIENT.end}
      locations={HOME_GRADIENT.locations}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Sidebar */}
        <Sidebar 
          visible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
        />
        
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setSidebarVisible(true)}
        >
          <MenuIcon />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <NewLogo width={120} height={40} />
        </View>
        
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <NotificationIcon />
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title */}
        <Text style={styles.pageTitle}>Feed</Text>

        {/* Feed Posts with Banner */}
        {feedPosts.map((post, index) => (
          <React.Fragment key={post.id}>
            <FeedPost
              authorName={post.authorName}
              date={post.date}
              time={post.time}
              content={post.content}
              image={post.image}
              likes={post.likes}
              comments={post.comments}
              isLiked={post.isLiked}
              onLike={() => handleLike(post.id)}
              onComment={() => handleComment(post.id)}
              onShare={() => handleShare(post.id)}
            />
            
            {/* Add banner after second post */}
            {index === 1 && (
              <FeedBanner
                image={bannerImage}
                currentIndex={0}
                totalCount={3}
                onPress={handleBannerPress}
              />
            )}
          </React.Fragment>
        ))}
      </ScrollView>

      {/* Comments Modal */}
      <CommentsModal
        visible={commentsModalVisible}
        onClose={() => setCommentsModalVisible(false)}
        comments={mockComments}
        onSubmitComment={handleSubmitComment}
        onReportComment={handleReportComment}
      />

      {/* Report Dialog */}
      <ReportDialog
        visible={reportDialogVisible}
        onClose={() => setReportDialogVisible(false)}
        onConfirm={handleConfirmReport}
      />

      {/* Report Success Modal */}
      <ReportSuccessModal
        visible={reportSuccessModalVisible}
        onClose={() => setReportSuccessModalVisible(false)}
      />
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
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  menuButton: {
    padding: 4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingTop: 12,
    paddingBottom: 40,
  },
  pageTitle: {
    fontFamily: 'Roboto Serif',
    fontSize: 24,
    color: '#69162B',
    lineHeight: 28.8, // 1.2 * 24
    paddingHorizontal: 16,
    marginBottom: 24,
  },
});