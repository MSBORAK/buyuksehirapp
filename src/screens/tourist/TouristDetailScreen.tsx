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
import { touristSpots, TouristSpot } from '../../data/mockData';

const { width } = Dimensions.get('window');

export default function TouristDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const [language, setLanguage] = useState<'tr' | 'en' | 'ar'>('tr');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const spotId = route.params?.spotId;
  const spot = touristSpots.find((s) => s.id === spotId);

  if (!spot) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Yer bulunamadı</Text>
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
    const url = `https://www.google.com/maps/search/?api=1&query=${spot.location.latitude},${spot.location.longitude}`;
    Linking.openURL(url);
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
          {spot.images.map((image, index) => (
            <Image
              key={index}
              source={typeof image === 'string' ? { uri: image } : image}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Image Pagination */}
        <View style={styles.pagination}>
          {spot.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentImageIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

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
              onPress={() => setLanguage(language === 'tr' ? 'en' : language === 'en' ? 'ar' : 'tr')}
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
            <Text style={styles.title}>{spot.name[language]}</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {spot.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <Text style={styles.description}>{spot.description[language]}</Text>

          {/* Info Cards */}
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Ionicons name="time-outline" size={24} color={colors.accent} />
              <Text style={styles.infoLabel}>Süre</Text>
              <Text style={styles.infoValue}>{spot.visitDuration}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="calendar-outline" size={24} color={colors.accent} />
              <Text style={styles.infoLabel}>Açılış</Text>
              <Text style={styles.infoValue} numberOfLines={2}>
                {spot.openingHours}
              </Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Ionicons name="ticket-outline" size={24} color={colors.secondary} />
              <Text style={styles.infoLabel}>Bilet</Text>
              <Text style={styles.infoValue}>{spot.ticketPrice}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="location-outline" size={24} color={colors.secondary} />
              <Text style={styles.infoLabel}>Konum</Text>
              <Text style={styles.infoValue} numberOfLines={2}>
                {spot.location.address[language as 'tr' | 'en'] || spot.location.address.en}
              </Text>
            </View>
          </View>

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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textOnSurface,
    flex: 1,
    marginRight: 12,
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textOnSurface,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textOnSurface,
    marginBottom: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
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
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 24,
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
