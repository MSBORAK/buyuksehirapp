import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { touristSpots } from '../../data/mockData';
import TouristSpotCard from '../../components/tourist/TouristSpotCard';

export default function TouristMapScreen() {
  const navigation = useNavigation<any>();
  const [language, setLanguage] = useState<'tr' | 'en' | 'ar'>('tr');

  const openAllSpotsInMap = () => {

    const coordinates = touristSpots.map((spot) => spot.location).join('/');
    const url = `https://www.google.com/maps/dir/${coordinates}`;
    Linking.openURL(url);
  };

  const openSpotInMap = (spot: typeof touristSpots[0]) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${spot.location.latitude},${spot.location.longitude}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Harita</Text>
          <Text style={styles.headerSubtitle}>
            {touristSpots.length} turistik yer
          </Text>
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={openAllSpotsInMap}>
          <Ionicons name="navigate" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map-outline" size={64} color={colors.textMuted} />
          <Text style={styles.mapPlaceholderText}>
            Harita görünümü için harici uygulama kullanılacak
          </Text>
          <Text style={styles.mapPlaceholderSubtext}>
            Tüm konumları görmek için haritaya git
          </Text>
          <TouchableOpacity style={styles.mapButton} onPress={openAllSpotsInMap}>
            <Ionicons name="map" size={20} color={colors.pale} />
            <Text style={styles.mapButtonText}>Google Maps'te Aç</Text>
          </TouchableOpacity>
        </View>

        {/* Markers Preview */}
        <View style={styles.markersContainer}>
          {touristSpots.map((spot, index) => (
            <TouchableOpacity
              key={spot.id}
              style={[
                styles.marker,
                { top: `${20 + index * 15}%`, left: `${30 + (index % 2) * 40}%` },
              ]}
              onPress={() => openSpotInMap(spot)}
            >
              <View style={styles.markerDot} />
              <View style={styles.markerTooltip}>
                <Text style={styles.markerText} numberOfLines={1}>
                  {spot.name[language]}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* List of Spots */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Turistik Yerler</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listScrollContent}
        >
          {touristSpots.map((spot) => (
            <View key={spot.id} style={styles.listCard}>
              <TouchableOpacity
                onPress={() => navigation.navigate('TouristDetail', { spotId: spot.id })}
              >
                <Text style={styles.listCardTitle}>{spot.name[language]}</Text>
                <Text style={styles.listCardSubtitle} numberOfLines={2}>
                  {spot.shortDescription[language]}
                </Text>
                <TouchableOpacity
                  style={styles.listCardButton}
                  onPress={() => openSpotInMap(spot)}
                >
                  <Ionicons name="location" size={16} color={colors.primary} />
                  <Text style={styles.listCardButtonText}>Yol Tarifi</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairline,
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 16,
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  mapButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.pale,
  },
  markersContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
  },
  markerDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.surface,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  markerTooltip: {
    position: 'absolute',
    top: 30,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 100,
  },
  markerText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  listContainer: {
    backgroundColor: colors.surface,
    paddingTop: 16,
    paddingBottom: 8,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  listScrollContent: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 16,
  },
  listCard: {
    width: 240,
    backgroundColor: colors.surfaceAlt,
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  listCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  listCardSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 12,
  },
  listCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  listCardButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
