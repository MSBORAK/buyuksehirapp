import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { CultureEvent } from '../../data/calendarData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

interface EventCardProps {
  event: CultureEvent;
  onPress: () => void;
  language?: 'tr' | 'en';
}

export default function EventCard({
  event,
  onPress,
  language = 'tr',
}: EventCardProps) {
  const getCategoryIcon = (category: CultureEvent['category']) => {
    switch (category) {
      case 'music':
        return 'musical-notes';
      case 'theater':
        return 'film';
      case 'exhibition':
        return 'image';
      case 'festival':
        return 'calendar';
      case 'workshop':
        return 'school';
      default:
        return 'calendar';
    }
  };

  const getCategoryColor = (category: CultureEvent['category']) => {
    switch (category) {
      case 'music':
        return colors.primary;
      case 'theater':
        return colors.gold;
      case 'exhibition':
        return '#7B1FA2';
      case 'festival':
        return '#E91E63';
      case 'workshop':
        return '#0097A7';
      default:
        return colors.textMuted;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
      month: 'short',
    });
    return `${day} ${month}`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, event.featured && styles.featuredContainer]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: event.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      {event.featured && (
        <View style={styles.featuredBadge}>
          <Ionicons name="star" size={16} color={colors.gold} />
          <Text style={styles.featuredText}>Öne Çıkan</Text>
        </View>
      )}
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.categoryBadge}>
              <Ionicons
                name={getCategoryIcon(event.category) as any}
                size={16}
                color={getCategoryColor(event.category)}
              />
              <Text
                style={[
                  styles.categoryText,
                  { color: getCategoryColor(event.category) },
                ]}
              >
                {event.category === 'music' && 'Müzik'}
                {event.category === 'theater' && 'Tiyatro'}
                {event.category === 'exhibition' && 'Sergi'}
                {event.category === 'festival' && 'Festival'}
                {event.category === 'workshop' && 'Atölye'}
              </Text>
            </View>
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {event.title[language]}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {event.shortDescription[language]}
          </Text>

          <View style={styles.footer}>
            <View style={styles.footerItem}>
              <Ionicons name="calendar-outline" size={14} color={colors.surface} />
              <Text style={styles.footerText}>{formatDate(event.date)}</Text>
            </View>
            <View style={styles.footerItem}>
              <Ionicons name="time-outline" size={14} color={colors.surface} />
              <Text style={styles.footerText}>{event.time}</Text>
            </View>
            <View style={styles.footerItem}>
              <Ionicons name="location-outline" size={14} color={colors.surface} />
              <Text style={styles.footerText} numberOfLines={1}>
                {event.location.name}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    marginBottom: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  featuredContainer: {
    borderWidth: 2,
    borderColor: colors.gold,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    zIndex: 10,
  },
  featuredText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.surface,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.surface,
    marginBottom: 8,
    lineHeight: 26,
  },
  description: {
    fontSize: 14,
    color: colors.surface,
    opacity: 0.95,
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    maxWidth: '48%',
  },
  footerText: {
    fontSize: 12,
    color: colors.surface,
    opacity: 0.9,
  },
});
