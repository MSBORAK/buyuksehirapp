import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { socialFacilities, SocialFacility } from '../../data/socialFacilitiesData';

const { width } = Dimensions.get('window');

export default function SocialFacilityDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const [language, setLanguage] = useState<'tr' | 'en' | 'ar'>('tr');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const facilityId = route.params?.facilityId;
  const facility = socialFacilities.find((f) => f.id === facilityId);

  if (!facility) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Tesis bulunamadı</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${facility.location.latitude},${facility.location.longitude}`;
    Linking.openURL(url);
  };

  const callFacility = () => {
    if (facility.phone) {
      Linking.openURL(`tel:${facility.phone}`);
    }
  };

  const getCategoryLabel = () => {
    switch (facility.category) {
      case 'sport':
        return 'Spor Tesisi';
      case 'library':
        return 'Kütüphane';
      case 'youth':
        return 'Gençlik Merkezi';
      case 'park':
        return 'Park';
      default:
        return 'Tesis';
    }
  };

  const getCategoryIcon = () => {
    switch (facility.category) {
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

  const getCategoryColor = () => {
    switch (facility.category) {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image Gallery */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentImageIndex(index);
          }}
          scrollEventThrottle={16}
        >
          {facility.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Image Pagination */}
        {facility.images.length > 1 && (
          <View style={styles.pagination}>
            {facility.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentImageIndex === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        )}

        {/* Header Actions */}
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textOnSurface} />
          </TouchableOpacity>
          <View style={styles.actionButtonsRight}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                setLanguage(language === 'tr' ? 'en' : language === 'en' ? 'ar' : 'tr')
              }
            >
              <Text style={styles.languageButton}>{language.toUpperCase()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={24} color={colors.textOnSurface} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <View style={styles.titleLeft}>
              <View
                style={[
                  styles.categoryBadge,
                  { backgroundColor: getCategoryColor() },
                ]}
              >
                <Ionicons name={getCategoryIcon() as any} size={20} color={colors.pale} />
              </View>
              <View style={styles.titleTextContainer}>
                <Text style={styles.title}>{facility.name[language]}</Text>
                <Text style={styles.categoryLabel}>{getCategoryLabel()}</Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={20} color={colors.accent} />
              <Text style={styles.rating}>{facility.rating}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{facility.description[language]}</Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Özellikler</Text>
            <View style={styles.featuresGrid}>
              {facility.features.map((feature, index) => (
                <View key={index} style={styles.featureTag}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Info Cards */}
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Ionicons name="time-outline" size={24} color={colors.accent} />
              <Text style={styles.infoLabel}>Açılış Saatleri</Text>
              <Text style={styles.infoValue}>{facility.openingHours}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="location-outline" size={24} color={colors.secondary} />
              <Text style={styles.infoLabel}>Konum</Text>
              <Text style={styles.infoValue} numberOfLines={2}>
                {facility.location.address[language as 'tr' | 'en']}
              </Text>
            </View>
          </View>

          {/* Contact Info */}
          {(facility.phone || facility.website) && (
            <View style={styles.contactContainer}>
              {facility.phone && (
                <TouchableOpacity style={styles.contactButton} onPress={callFacility}>
                  <Ionicons name="call" size={20} color={colors.pale} />
                  <Text style={styles.contactButtonText}>Ara</Text>
                </TouchableOpacity>
              )}
              {facility.website && (
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => Linking.openURL(facility.website!)}
                >
                  <Ionicons name="globe" size={20} color={colors.pale} />
                  <Text style={styles.contactButtonText}>Web Sitesi</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Map Button */}
          <TouchableOpacity style={styles.mapButton} onPress={openMap}>
            <Ionicons name="map" size={24} color={colors.pale} />
            <Text style={styles.mapButtonText}>Haritada Göster</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.pale} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  image: {
    width,
    height: 300,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: -20,
    marginBottom: 12,
    zIndex: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  paginationDotActive: {
    backgroundColor: colors.accent,
    width: 24,
  },
  headerActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    zIndex: 10,
  },
  actionButtonsRight: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(10,51,35,0.1)',
  },
  languageButton: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textOnSurface,
  },
  content: {
    padding: 20,
    backgroundColor: colors.surface,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  categoryBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textOnSurface,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  rating: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textOnSurface,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textOnSurface,
    marginBottom: 24,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textOnSurface,
    marginBottom: 12,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textOnSurface,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(10,51,35,0.08)',
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textOnSurface,
    textAlign: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    padding: 14,
    borderRadius: 16,
    gap: 8,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.pale,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 16,
    gap: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  mapButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.pale,
    flex: 1,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.textMuted,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.pale,
  },
});
