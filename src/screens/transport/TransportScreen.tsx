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
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { transportRoutes, UrfaKartInfo } from '../../data/transportData';

// Mock UrfaKart data
const mockUrfaKart: UrfaKartInfo = {
  cardNumber: '**** **** **** 1234',
  balance: 87.50,
  lastTransaction: {
    date: '2024-01-15 14:30',
    amount: 15,
    type: 'payment',
    location: 'Hat 1 - Şehir Merkezi',
  },
};

export default function TransportScreen() {
  const [activeTab, setActiveTab] = useState<'balance' | 'routes' | 'recharge'>('balance');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoutes = transportRoutes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.number.includes(searchQuery)
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Ulaşım & UrfaKart</Text>
          <Text style={styles.headerSubtitle}>Toplu taşıma ve kart işlemleri</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'balance' && styles.tabActive]}
          onPress={() => setActiveTab('balance')}
        >
          <Ionicons
            name="card"
            size={20}
            color={activeTab === 'balance' ? colors.primary : colors.textMuted}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'balance' && styles.tabTextActive,
            ]}
          >
            Kart Bakiyem
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'routes' && styles.tabActive]}
          onPress={() => setActiveTab('routes')}
        >
          <Ionicons
            name="bus"
            size={20}
            color={activeTab === 'routes' ? colors.primary : colors.textMuted}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'routes' && styles.tabTextActive,
            ]}
          >
            Güzergahlar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'recharge' && styles.tabActive]}
          onPress={() => setActiveTab('recharge')}
        >
          <Ionicons
            name="add-circle"
            size={20}
            color={activeTab === 'recharge' ? colors.primary : colors.textMuted}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'recharge' && styles.tabTextActive,
            ]}
          >
            Yükle
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'balance' && (
          <View style={styles.content}>
            {/* UrfaKart Card */}
            <View style={styles.cardContainer}>
              <View style={styles.urfaCard}>
                <View style={styles.cardHeader}>
                  <Ionicons name="card" size={32} color={colors.gold} />
                  <Text style={styles.cardTitle}>UrfaKart</Text>
                </View>
                <Text style={styles.cardNumber}>{mockUrfaKart.cardNumber}</Text>
                <View style={styles.balanceContainer}>
                  <Text style={styles.balanceLabel}>Bakiye</Text>
                  <Text style={styles.balanceAmount}>
                    {mockUrfaKart.balance.toFixed(2)} ₺
                  </Text>
                </View>
              </View>

              {/* Last Transaction */}
              {mockUrfaKart.lastTransaction && (
                <View style={styles.transactionCard}>
                  <View style={styles.transactionHeader}>
                    <Ionicons name="time" size={20} color={colors.textMuted} />
                    <Text style={styles.transactionTitle}>Son İşlem</Text>
                  </View>
                  <View style={styles.transactionDetails}>
                    <View style={styles.transactionRow}>
                      <Text style={styles.transactionLabel}>Tarih</Text>
                      <Text style={styles.transactionValue}>
                        {mockUrfaKart.lastTransaction.date}
                      </Text>
                    </View>
                    <View style={styles.transactionRow}>
                      <Text style={styles.transactionLabel}>Tutar</Text>
                      <Text
                        style={[
                          styles.transactionValue,
                          styles.transactionAmount,
                        ]}
                      >
                        -{mockUrfaKart.lastTransaction.amount} ₺
                      </Text>
                    </View>
                    <View style={styles.transactionRow}>
                      <Text style={styles.transactionLabel}>Konum</Text>
                      <Text style={styles.transactionValue}>
                        {mockUrfaKart.lastTransaction.location}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Quick Actions */}
              <View style={styles.quickActions}>
                <TouchableOpacity
                  style={styles.quickActionButton}
                  onPress={() => setActiveTab('recharge')}
                >
                  <View style={styles.quickActionIcon}>
                    <Ionicons name="add-circle" size={28} color={colors.primary} />
                  </View>
                  <Text style={styles.quickActionText}>Bakiye Yükle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionButton}>
                  <View style={styles.quickActionIcon}>
                    <Ionicons name="receipt" size={28} color={colors.gold} />
                  </View>
                  <Text style={styles.quickActionText}>İşlem Geçmişi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'routes' && (
          <View style={styles.content}>
            {/* Search */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Güzergah ara..."
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

            {/* Routes List */}
            {filteredRoutes.map((route) => (
              <TouchableOpacity key={route.id} style={styles.routeCard}>
                <View style={styles.routeHeader}>
                  <View style={styles.routeNumberBadge}>
                    <Text style={styles.routeNumber}>{route.number}</Text>
                  </View>
                  <View style={styles.routeInfo}>
                    <Text style={styles.routeName}>{route.name}</Text>
                    <View style={styles.routeStops}>
                      <Ionicons name="location" size={14} color={colors.textMuted} />
                      <Text style={styles.routeStopsText}>
                        {route.startPoint} → {route.endPoint}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.routeFooter}>
                  <View style={styles.routeDetail}>
                    <Ionicons name="cash" size={16} color={colors.primary} />
                    <Text style={styles.routeDetailText}>{route.price}</Text>
                  </View>
                  <View style={styles.routeDetail}>
                    <Ionicons name="time" size={16} color={colors.gold} />
                    <Text style={styles.routeDetailText}>{route.frequency}</Text>
                  </View>
                  <View style={styles.routeDetail}>
                    <Ionicons name="calendar" size={16} color={colors.textMuted} />
                    <Text style={styles.routeDetailText}>{route.operatingHours}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'recharge' && (
          <View style={styles.content}>
            <View style={styles.rechargeCard}>
              <Ionicons name="card-outline" size={64} color={colors.primary} />
              <Text style={styles.rechargeTitle}>Bakiye Yükle</Text>
              <Text style={styles.rechargeDescription}>
                Bu özellik yakında aktif olacaktır. Şimdilik kartınızı belediye merkezlerinden
                veya belirlenen noktalardan yükleyebilirsiniz.
              </Text>

              {/* Recharge Options */}
              <View style={styles.rechargeOptions}>
                {[25, 50, 100, 200].map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={styles.rechargeOptionButton}
                    disabled
                  >
                    <Text style={styles.rechargeOptionText}>+{amount} ₺</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.rechargeInfo}>
                <Ionicons name="information-circle" size={20} color={colors.textMuted} />
                <Text style={styles.rechargeInfoText}>
                  Özel tutar girişi ve online ödeme özellikleri yakında eklenecektir.
                </Text>
              </View>
            </View>
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    gap: 6,
  },
  tabActive: {
    backgroundColor: colors.primary + '15',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  tabTextActive: {
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  content: {
    gap: 16,
  },
  cardContainer: {
    gap: 16,
  },
  urfaCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 24,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.surface,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.surface,
    letterSpacing: 2,
    marginBottom: 24,
  },
  balanceContainer: {
    alignItems: 'flex-start',
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.surface,
    opacity: 0.9,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.gold,
  },
  transactionCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  transactionDetails: {
    gap: 12,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  transactionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  transactionAmount: {
    color: colors.primary,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    padding: 0,
  },
  routeCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 12,
  },
  routeHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  routeNumberBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.surface,
  },
  routeInfo: {
    flex: 1,
    gap: 6,
  },
  routeName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  routeStops: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  routeStopsText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  routeFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
  },
  routeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  routeDetailText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  rechargeCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    gap: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  rechargeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  rechargeDescription: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  rechargeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
    width: '100%',
  },
  rechargeOptionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surfaceAlt,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    opacity: 0.6,
  },
  rechargeOptionText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  rechargeInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 8,
    backgroundColor: colors.surfaceAlt,
    padding: 16,
    borderRadius: 12,
  },
  rechargeInfoText: {
    flex: 1,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 32,
  },
});

