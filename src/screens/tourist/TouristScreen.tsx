import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { touristSpots } from '../../data/mockData';
import TouristSpotCard from '../../components/tourist/TouristSpotCard';

type Language = 'tr' | 'en' | 'ar';

export default function TouristScreen() {
  const navigation = useNavigation<any>();
  const [language, setLanguage] = useState<Language>('tr');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpots = touristSpots.filter((spot) =>
    spot.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
    spot.shortDescription[language].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const languages: { code: Language; label: string }[] = [
    { code: 'tr', label: 'TR' },
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'AR' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Turistik Yerler</Text>
          <Text style={styles.headerSubtitle}>{filteredSpots.length} yer keşfet</Text>
        </View>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => navigation.navigate('TouristMap')}
        >
          <Ionicons name="map" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Language Selector */}
      <View style={styles.languageContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              language === lang.code && styles.languageButtonActive,
            ]}
            onPress={() => setLanguage(lang.code)}
          >
            <Text
              style={[
                styles.languageText,
                language === lang.code && styles.languageTextActive,
              ]}
            >
              {lang.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Yer ara..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredSpots.map((spot) => (
          <TouristSpotCard
            key={spot.id}
            spot={spot}
            language={language}
            onPress={() => navigation.navigate('TouristDetail', { spotId: spot.id })}
          />
        ))}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairline,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  mapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    gap: 8,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
  },
  languageButtonActive: {
    backgroundColor: colors.primary,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  languageTextActive: {
    color: colors.surface,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    padding: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  bottomSpacing: {
    height: 32,
  },
});
