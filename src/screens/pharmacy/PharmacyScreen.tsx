import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { pharmacies, Pharmacy } from '../../data/pharmacyData';

export default function PharmacyScreen() {
  const navigation = useNavigation();
  const [showOnlyOnDuty, setShowOnlyOnDuty] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    const matchesOnDuty = !showOnlyOnDuty || pharmacy.isOnDuty;
    const matchesSearch =
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesOnDuty && matchesSearch;
  });

  const sortedPharmacies = [...filteredPharmacies].sort((a, b) => {
    if (a.isOnDuty !== b.isOnDuty) return a.isOnDuty ? -1 : 1;
    return (a.distance || 999) - (b.distance || 999);
  });

  const onDutyCount = pharmacies.filter((p) => p.isOnDuty).length;

  const callPharmacy = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const openMap = (pharmacy: Pharmacy) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${pharmacy.location.latitude},${pharmacy.location.longitude}`;
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
          <Text style={styles.headerTitle}>Nöbetçi Eczaneler</Text>
          <Text style={styles.headerSubtitle}>
            {onDutyCount} eczane nöbetçi
          </Text>
        </View>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => {
            // Open all pharmacies in map
            const coordinates = pharmacies
              .filter((p) => p.isOnDuty)
              .map((p) => p.location)
              .join('/');
            const url = `https://www.google.com/maps/dir/${coordinates}`;
            Linking.openURL(url);
          }}
        >
          <Ionicons name="map" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Toggle */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            showOnlyOnDuty && styles.filterButtonActive,
          ]}
          onPress={() => setShowOnlyOnDuty(!showOnlyOnDuty)}
        >
          <Ionicons
            name={showOnlyOnDuty ? 'checkmark-circle' : 'ellipse-outline'}
            size={20}
            color={showOnlyOnDuty ? colors.pale : colors.textOnSurface}
          />
          <Text
            style={[
              styles.filterText,
              showOnlyOnDuty && styles.filterTextActive,
            ]}
          >
            Sadece Nöbetçiler
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Eczane ara..."
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
        {sortedPharmacies.map((pharmacy) => (
          <TouchableOpacity
            key={pharmacy.id}
            style={[
              styles.pharmacyCard,
              pharmacy.isOnDuty && styles.pharmacyCardOnDuty,
            ]}
            onPress={() => openMap(pharmacy)}
            activeOpacity={0.9}
          >
            <View style={styles.pharmacyHeader}>
              <View style={styles.pharmacyInfo}>
                <View style={styles.pharmacyNameRow}>
                  <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
                  {pharmacy.isOnDuty && (
                    <View style={styles.onDutyBadge}>
                      <Ionicons name="medical" size={14} color={colors.pale} />
                      <Text style={styles.onDutyText}>Nöbetçi</Text>
                    </View>
                  )}
                </View>
                <View style={styles.pharmacyAddress}>
                  <Ionicons name="location" size={14} color={colors.textMuted} />
                  <Text style={styles.addressText} numberOfLines={2}>
                    {pharmacy.address}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.pharmacyFooter}>
              {pharmacy.distance && (
                <View style={styles.footerItem}>
                  <Ionicons name="walk" size={16} color={colors.textMuted} />
                  <Text style={styles.footerText}>{pharmacy.distance} km</Text>
                </View>
              )}
              {pharmacy.isOnDuty && pharmacy.dutyHours && (
                <View style={styles.footerItem}>
                  <Ionicons name="time" size={16} color={colors.primary} />
                  <Text style={styles.footerText}>
                    {pharmacy.dutyHours.start}
                    {pharmacy.dutyHours.end && ` - ${pharmacy.dutyHours.end}`}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.callButton}
                onPress={(e) => {
                  e.stopPropagation();
                  callPharmacy(pharmacy.phone);
                }}
              >
                <Ionicons name="call" size={18} color={colors.pale} />
                <Text style={styles.callButtonText}>Ara</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {sortedPharmacies.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="medical-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyText}>Eczane bulunamadı</Text>
            <Text style={styles.emptySubtext}>
              Arama kriterlerini değiştirip tekrar deneyin
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: 'transparent', // Şeffaf - arka planla uyumlu
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface, // Beige yüzey
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text, // Açık metin koyu arka plan üzerinde
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
    backgroundColor: colors.surface, // Beige yüzey
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24, // Daha oval
    backgroundColor: colors.surface, // Beige yüzey
    gap: 8,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  filterButtonActive: {
    backgroundColor: colors.primary, // Dark green - aktif
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textOnSurface, // Koyu metin beige yüzey üzerinde
  },
  filterTextActive: {
    color: colors.pale, // Açık metin dark green üzerinde
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface, // Beige yüzey
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 20, // Daha yuvarlak
    gap: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textOnSurface, // Koyu metin beige yüzey üzerinde
    padding: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120, // Bottom tab bar için yeterli boşluk
  },
  pharmacyCard: {
    backgroundColor: colors.surface, // Beige yüzey
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  pharmacyCardOnDuty: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary, // Dark green border
  },
  pharmacyHeader: {
    marginBottom: 16,
  },
  pharmacyInfo: {
    gap: 8,
  },
  pharmacyNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textOnSurface, // Koyu metin beige yüzey üzerinde
    flex: 1,
  },
  onDutyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary, // Dark green
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  onDutyText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.pale, // Pale text on primary background
  },
  pharmacyAddress: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  pharmacyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
    gap: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary, // Dark green
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.pale, // Pale text on primary background
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
    color: colors.text, // Açık metin koyu arka plan üzerinde
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
