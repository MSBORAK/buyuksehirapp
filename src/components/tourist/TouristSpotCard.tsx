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
import { TouristSpot } from '../../data/mockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

interface TouristSpotCardProps {
  spot: TouristSpot;
  onPress: () => void;
  language?: 'tr' | 'en' | 'ar';
}

export default function TouristSpotCard({
  spot,
  onPress,
  language = 'tr',
}: TouristSpotCardProps) {
  const getCategoryIcon = (category: TouristSpot['category']) => {
    switch (category) {
      case 'historical':
        return 'library';
      case 'religious':
        return 'star';
      case 'natural':
        return 'leaf';
      case 'cultural':
        return 'musical-notes';
      default:
        return 'location';
    }
  };

  const getCategoryColor = (category: TouristSpot['category']) => {
    switch (category) {
      case 'historical':
        return colors.primary;
      case 'religious':
        return colors.gold;
      case 'natural':
        return '#2E7D32';
      case 'cultural':
        return '#7B1FA2';
      default:
        return colors.textMuted;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: spot.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.categoryBadge}>
              <Ionicons
                name={getCategoryIcon(spot.category) as any}
                size={16}
                color={getCategoryColor(spot.category)}
              />
              <Text style={[styles.categoryText, { color: getCategoryColor(spot.category) }]}>
                {spot.category === 'historical' && 'Tarihi'}
                {spot.category === 'religious' && 'Dini'}
                {spot.category === 'natural' && 'Doğal'}
                {spot.category === 'cultural' && 'Kültürel'}
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={colors.gold} />
              <Text style={styles.rating}>{spot.rating}</Text>
            </View>
          </View>

          <Text style={styles.name}>{spot.name[language]}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {spot.shortDescription[language]}
          </Text>

          <View style={styles.footer}>
            <View style={styles.footerItem}>
              <Ionicons name="time-outline" size={14} color={colors.pale} />
              <Text style={styles.footerText}>{spot.visitDuration}</Text>
            </View>
            <View style={styles.footerItem}>
              <Ionicons name="location-outline" size={14} color={colors.pale} />
              <Text style={styles.footerText} numberOfLines={1}>
                {(spot.location.address as any)[language] || spot.location.address.en || spot.location.address.tr}
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
    height: 320,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    marginBottom: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
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
    backgroundColor: colors.surface, // Beige yüzey
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textOnSurface, // Koyu metin beige yüzey üzerinde
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface, // Beige yüzey (beyaz yerine)
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  rating: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textOnSurface, // Koyu metin beige yüzey üzerinde
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.surface,
    marginBottom: 8,
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
    gap: 16,
    flexWrap: 'wrap',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    maxWidth: '45%',
  },
  footerText: {
    fontSize: 12,
    color: colors.surface,
    opacity: 0.9,
  },
});
