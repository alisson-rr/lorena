import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';
import OptionsMenu from './OptionsMenu';

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  time: string;
  content: string;
}

interface CommentsModalProps {
  visible: boolean;
  onClose: () => void;
  comments: Comment[];
  onSubmitComment: (comment: string) => void;
  onReportComment?: (commentId: string) => void;
}

export default function CommentsModal({ 
  visible, 
  onClose, 
  comments,
  onSubmitComment,
  onReportComment 
}: CommentsModalProps) {
  const [newComment, setNewComment] = useState('');
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleSubmit = () => {
    if (newComment.trim()) {
      onSubmitComment(newComment);
      setNewComment('');
    }
  };

  const handleOptionsPress = (commentId: string, event: any) => {
    setSelectedCommentId(commentId);
    // Get position for menu
    const { pageY } = event.nativeEvent;
    setMenuPosition({ x: 0, y: pageY });
    setOptionsMenuVisible(true);
  };

  const handleReport = () => {
    setOptionsMenuVisible(false);
    if (selectedCommentId && onReportComment) {
      onReportComment(selectedCommentId);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Comentários</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#69162B" />
              </TouchableOpacity>
            </View>

            {/* Comments List */}
            <ScrollView 
              style={styles.commentsList}
              showsVerticalScrollIndicator={false}
            >
              {comments.map((comment) => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <View style={styles.authorSection}>
                      {comment.avatar ? (
                        <Image source={{ uri: comment.avatar }} style={styles.avatar} />
                      ) : (
                        <View style={[styles.avatar, styles.avatarPlaceholder]}>
                          <Ionicons name="person" size={16} color="#FFFFFF" />
                        </View>
                      )}
                      <Text style={styles.authorName}>{comment.author}</Text>
                      <Text style={styles.commentTime}>{comment.time}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.moreButton}
                      onPress={(event) => handleOptionsPress(comment.id, event)}
                    >
                      <Ionicons name="ellipsis-vertical" size={20} color="#69162B" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.commentContent}>{comment.content}</Text>
                </View>
              ))}
            </ScrollView>

            {/* Input Section */}
            <View style={styles.inputSection}>
              <TextInput
                style={styles.input}
                placeholder="Digite seu comentário"
                placeholderTextColor="#8F7E81"
                value={newComment}
                onChangeText={setNewComment}
                multiline
                maxLength={500}
              />
              
              <TouchableOpacity 
                style={[styles.submitButton, !newComment.trim() && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={!newComment.trim()}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>Publicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>

      {/* Options Menu */}
      <OptionsMenu
        visible={optionsMenuVisible}
        onClose={() => setOptionsMenuVisible(false)}
        onReport={handleReport}
        position={menuPosition}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#F0EBEA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: '#D8BFC4',
    maxHeight: '80%',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D8BFC4',
  },
  title: {
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 18,
    color: '#69162B',
    fontWeight: 'normal',
  },
  closeButton: {
    padding: 4,
  },
  commentsList: {
    flex: 1,
    padding: 20,
  },
  commentItem: {
    marginBottom: 20,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  avatarPlaceholder: {
    backgroundColor: '#69162B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorName: {
    fontFamily: fonts.almaraiBold,
    fontSize: 14,
    color: '#69162B',
    marginRight: 8,
  },
  commentTime: {
    fontFamily: fonts.almarai,
    fontSize: 12,
    color: '#8F7E81',
  },
  moreButton: {
    padding: 4,
  },
  commentContent: {
    fontFamily: fonts.almarai,
    fontSize: 14,
    color: '#4D4847',
    lineHeight: 20,
    marginLeft: 42,
  },
  inputSection: {
    padding: 20,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#69162B',
    borderRadius: 12,
    padding: 12,
    fontFamily: fonts.almarai,
    fontSize: 14,
    color: '#4D4847',
    height: 48,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  submitButton: {
    backgroundColor: '#69162B',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});