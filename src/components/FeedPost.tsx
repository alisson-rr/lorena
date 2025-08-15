import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, fontWeights } from '../utils/fonts';
import CommentIcon from './icons/CommentIcon';
import ShareIcon from './icons/ShareIcon';

interface FeedPostProps {
  authorName: string;
  date: string;
  time: string;
  content?: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

export default function FeedPost({ 
  authorName,
  date,
  time,
  content,
  image,
  likes,
  comments,
  isLiked = false,
  onLike,
  onComment,
  onShare
}: FeedPostProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    onLike();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.authorText}>
          Postado por <Text style={styles.authorName}>{authorName}</Text>
        </Text>
        <Text style={styles.dateTime}>{date} - {time}</Text>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        {/* Top Divider */}
        <View style={styles.divider} />

        {/* Image if exists */}
        {image && (
          <Image source={{ uri: image }} style={styles.postImage} />
        )}

        {/* Content */}
        {content && (
          <Text style={styles.content}>{content}</Text>
        )}

        {/* Bottom Divider */}
        <View style={styles.divider} />

        {/* Actions */}
        <View style={styles.actions}>
          <View style={styles.leftActions}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleLike}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={liked ? "heart" : "heart-outline"} 
                size={24} 
                color={liked ? "#DC372A" : "#69162B"} 
              />
              <Text style={[styles.actionText, liked && styles.likedText]}>
                {likeCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={onComment}
              activeOpacity={0.7}
            >
              <CommentIcon color="#69162B" size={24} />
              <Text style={styles.actionText}>{comments}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={onShare}
            activeOpacity={0.7}
            style={styles.shareButton}
          >
            <ShareIcon size={24} color="#69162B" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EBEA',
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D8BFC4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  authorText: {
    fontFamily: fonts.almarai,
    fontSize: 13,
    color: '#69162B',
    lineHeight: 19.5, // 1.5 * 13
  },
  authorName: {
    fontFamily: fonts.almaraiBold,
    fontWeight: fontWeights.bold,
    color: '#69162B',
  },
  dateTime: {
    fontFamily: fonts.almarai,
    fontSize: 13,
    color: '#69162B',
    lineHeight: 19.5, // 1.5 * 13
  },
  contentSection: {
    gap: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#D8BFC4',
    marginHorizontal: -16,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    backgroundColor: '#E8E0DD',
    borderWidth: 1,
    borderColor: '#D8BFC4',
  },
  content: {
    fontFamily: fonts.almarai,
    fontSize: 14,
    color: '#4D4847',
    lineHeight: 21, // 1.5 * 14
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 24,
  },
  leftActions: {
    flexDirection: 'row',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#69162B',
    lineHeight: 16.8, // 1.2 * 14
  },
  likedText: {
    color: '#DC372A',
  },
  shareButton: {
    padding: 2, // Small padding for better touch area
  },
});