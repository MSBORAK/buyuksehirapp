import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Story } from '../../data/mockData';

const { width, height } = Dimensions.get('window');

interface StoryModalProps {
  story: Story | null;
  visible: boolean;
  onClose: () => void;
}

export default function StoryModal({ story, visible, onClose }: StoryModalProps) {
  if (!story) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Image
          source={{ uri: story.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.8}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={32} color={colors.pale} />
          </TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <View style={styles.titleBadge}>
                <Ionicons name="star" size={20} color={colors.gold} />
                <Text style={styles.title}>{story.title}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, // Off-Navy - Luxury dark background
  },
  image: {
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
  },
  titleContainer: {
    marginBottom: 32,
  },
  titleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: 'flex-start',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.pale, // Pale text on dark background
  },
});
