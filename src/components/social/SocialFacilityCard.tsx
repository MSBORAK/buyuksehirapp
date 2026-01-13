import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { SocialFacility, FacilityCategory } from '../../data/socialFacilitiesData';

interface SocialFacilityCardProps {
  facility: SocialFacility;
  language: 'tr' | 'en' | 'ar';
  onPress: () => void;
}

const getCategoryIcon = (category: FacilityCategory) => {
  switch (category) {
    case 'sport':
      return 'fitness';
    case 'library':
      return 'library';
    case 'youth':
      return 'people';
    case 'park':
      return 'leaf';
    default:
      return 'business';
  }
};

const getCategoryColor = (category: FacilityCategory) => {
  switch (category) {
    case 'sport':
      return colors.primary;
    case 'library':
      return colors.secondary;
    case 'youth':
      return colors.accent;
    case 'park':
      return colors.accentLight;
    default:
      return colors.textMuted;
  }
};

export default function SocialFacilityCard({
  facility,
  language,
  onPress,
}: SocialFacilityCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {/* Image */}
      <Image
        source={{ uri: facility.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: getCategoryColor(facility.category) },
              ]}
            >
              <Ionicons
                name={getCategoryIcon(facility.category) as any}
                size={18}
                color={colors.pale}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {facility.name[language]}
              </Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                {facility.shortDescription[language]}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Ionicons name="time-outline" size={14} color={colors.pale} />
            <Text style={styles.footerText} numberOfLines={1}>
              {facility.openingHours}
            </Text>
          </View>
          <View style={styles.footerItem}>
            <Ionicons name="location-outline" size={14} color={colors.pale} />
            <Text style={styles.footerText} numberOfLines={1}>
              {facility.location.address[language as 'tr' | 'en']}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.surfaceAlt,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  categoryBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  titleContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textOnSurface,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rating: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textOnSurface,
  },
  footer: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(10,51,35,0.1)',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  footerText: {
    fontSize: 12,
    color: colors.textMuted,
    flex: 1,
  },
});
