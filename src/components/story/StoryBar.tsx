import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { stories, Story } from '../../data/mockData';
import StoryModal from './StoryModal';

const { width } = Dimensions.get('window');
const STORY_SIZE = 72;

export default function StoryBar() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const getStoryIcon = (category: Story['category']) => {
    switch (category) {
      case 'message':
        return 'megaphone';
      case 'event':
        return 'calendar';
      case 'announcement':
        return 'warning';
      case 'gallery':
        return 'images';
      default:
        return 'ellipse';
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {stories.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={styles.storyItem}
              onPress={() => setSelectedStory(story)}
              activeOpacity={0.8}
            >
              <View style={styles.storyCircle}>
                <View style={styles.storyGradient}>
                  <Ionicons
                    name={getStoryIcon(story.category) as any}
                    size={32}
                    color={colors.primary}
                  />
                </View>
              </View>
              <Text style={styles.storyTitle} numberOfLines={1}>
                {story.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <StoryModal
        story={selectedStory!}
        visible={!!selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairline,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  storyItem: {
    alignItems: 'center',
    width: STORY_SIZE + 16,
  },
  storyCircle: {
    width: STORY_SIZE,
    height: STORY_SIZE,
    borderRadius: STORY_SIZE / 2,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  storyGradient: {
    width: STORY_SIZE - 12,
    height: STORY_SIZE - 12,
    borderRadius: (STORY_SIZE - 12) / 2,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyTitle: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
    maxWidth: STORY_SIZE + 16,
  },
});
