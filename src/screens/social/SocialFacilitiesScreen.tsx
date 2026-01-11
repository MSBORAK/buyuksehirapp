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
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import SocialFacilityCard from '../../components/social/SocialFacilityCard';
import { socialFacilities, SocialFacility, FacilityCategory } from '../../data/socialFacilitiesData';

type Language = 'tr' | 'en' | 'ar';

const categories: { key: FacilityCategory | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'Tümü', icon: 'apps' },
  { key: 'sport', label: 'Spor', icon: 'fitness' },
  { key: 'library', label: 'Kütüphane', icon: 'library' },
  { key: 'youth', label: 'Gençlik', icon: 'people' },
  { key: 'park', label: 'Park', icon: 'leaf' },
];

export default function SocialFacilitiesScreen() {
  const navigation = useNavigation<any>();
  const swipeHandlers = useSwipeGesture('Social');
  const [language, setLanguage] = useState<Language>('tr');
  const [categoryFilter, setCategoryFilter] = useState<FacilityCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFacilities = socialFacilities.filter((facility) => {
    const matchesCategory = categoryFilter === 'all' || facility.category === categoryFilter;
    const matchesSearch =
      facility.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.shortDescription[language].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredFacilities = filteredFacilities.filter((f) => f.isFeatured);
  const regularFacilities = filteredFacilities.filter((f) => !f.isFeatured);

  const languages: { code: Language; label: string }[] = [
    { code: 'tr', label: 'TR' },
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'AR' },
  ];


  return (
    <SafeAreaView style={styles.container} {...swipeHandlers}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Sosyal Tesisler</Text>
            <Text style={styles.headerSubtitle}>
              {filteredFacilities.length} tesis bulundu
            </Text>
          </View>
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => navigation.navigate('SocialMap')}
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
            placeholder="Tesis ara..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Filter */}
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryButton,
                categoryFilter === category.key && styles.categoryButtonActive,
              ]}
              onPress={() => setCategoryFilter(category.key as any)}
            >
              <Ionicons
                name={category.icon as any}
                size={18}
                color={
                  categoryFilter === category.key
                    ? colors.pale
                    : colors.textOnSurface
                }
              />
              <Text
                style={[
                  styles.categoryText,
                  categoryFilter === category.key && styles.categoryTextActive,
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Featured Facilities */}
        {featuredFacilities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Öne Çıkanlar</Text>
            {featuredFacilities.map((facility) => (
              <SocialFacilityCard
                key={facility.id}
                facility={facility}
                language={language}
                onPress={() =>
                  navigation.navigate('SocialDetail', { facilityId: facility.id })
                }
              />
            ))}
          </View>
        )}

        {/* Regular Facilities */}
        {regularFacilities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tüm Tesisler</Text>
            {regularFacilities.map((facility) => (
              <SocialFacilityCard
                key={facility.id}
                facility={facility}
                language={language}
                onPress={() =>
                  navigation.navigate('SocialDetail', { facilityId: facility.id })
                }
              />
            ))}
          </View>
        )}

        {filteredFacilities.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyText}>Tesis bulunamadı</Text>
            <Text style={styles.emptySubtext}>
              Farklı bir arama terimi veya kategori deneyin
            </Text>
          </View>
        )}
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
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: 'transparent',
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
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  languageContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
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
    color: colors.pale,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginBottom: 12,
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
    color: colors.textOnSurface,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '22%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: colors.surface,
    gap: 6,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textOnSurface,
  },
  categoryTextActive: {
    color: colors.pale,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 24,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 8,
    textAlign: 'center',
  },
});
