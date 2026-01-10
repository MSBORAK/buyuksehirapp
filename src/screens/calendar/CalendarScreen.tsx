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
import { cultureEvents } from '../../data/calendarData';
import EventCard from '../../components/calendar/EventCard';

type Language = 'tr' | 'en';
type FilterCategory = 'all' | 'music' | 'theater' | 'exhibition' | 'festival' | 'workshop';

export default function CalendarScreen() {
  const navigation = useNavigation<any>();
  const [language, setLanguage] = useState<Language>('tr');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = cultureEvents.filter((event) => {
    const matchesCategory =
      categoryFilter === 'all' || event.category === categoryFilter;
    const matchesSearch =
      event.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.shortDescription[language]
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredEvents = filteredEvents.filter((e) => e.featured);
  const regularEvents = filteredEvents.filter((e) => !e.featured);

  const categories: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: 'Tümü' },
    { key: 'music', label: 'Müzik' },
    { key: 'theater', label: 'Tiyatro' },
    { key: 'exhibition', label: 'Sergi' },
    { key: 'festival', label: 'Festival' },
    { key: 'workshop', label: 'Atölye' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Kültür-Sanat Takvimi</Text>
          <Text style={styles.headerSubtitle}>
            {filteredEvents.length} etkinlik bulundu
          </Text>
        </View>
        <View style={styles.languageButtons}>
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'tr' && styles.languageButtonActive,
            ]}
            onPress={() => setLanguage('tr')}
          >
            <Text
              style={[
                styles.languageText,
                language === 'tr' && styles.languageTextActive,
              ]}
            >
              TR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'en' && styles.languageButtonActive,
            ]}
            onPress={() => setLanguage('en')}
          >
            <Text
              style={[
                styles.languageText,
                language === 'en' && styles.languageTextActive,
              ]}
            >
              EN
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Etkinlik ara..."
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

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
        style={styles.categoryContainer}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.categoryButton,
              categoryFilter === cat.key && styles.categoryButtonActive,
            ]}
            onPress={() => setCategoryFilter(cat.key)}
          >
            <Text
              style={[
                styles.categoryText,
                categoryFilter === cat.key && styles.categoryTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Events List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Öne Çıkan Etkinlikler</Text>
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                language={language}
                onPress={() =>
                  navigation.navigate('EventDetail', { eventId: event.id })
                }
              />
            ))}
          </View>
        )}

        {/* Regular Events */}
        {regularEvents.length > 0 && (
          <View style={styles.section}>
            {featuredEvents.length > 0 && (
              <Text style={styles.sectionTitle}>Diğer Etkinlikler</Text>
            )}
            {regularEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                language={language}
                onPress={() =>
                  navigation.navigate('EventDetail', { eventId: event.id })
                }
              />
            ))}
          </View>
        )}

        {filteredEvents.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyText}>Etkinlik bulunamadı</Text>
            <Text style={styles.emptySubtext}>
              Filtreleri değiştirip tekrar deneyin
            </Text>
          </View>
        )}

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
  languageButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
  },
  languageButtonActive: {
    backgroundColor: colors.primary,
  },
  languageText: {
    fontSize: 12,
    fontWeight: '700',
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
  categoryContainer: {
    maxHeight: 60,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  categoryTextActive: {
    color: colors.surface,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
    gap: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 32,
  },
});

