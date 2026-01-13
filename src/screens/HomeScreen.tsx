import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { useSwipeGesture } from '../hooks/useSwipeGesture';
import StoryBar from '../components/story/StoryBar';
import WeatherWidget from '../components/weather/WeatherWidget';
import NewsSlider from '../components/news/NewsSlider';
import HomeGridCard from '../components/home/HomeGridCard';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const swipeHandlers = useSwipeGesture('Home');

  return (
    <SafeAreaView style={styles.container} {...swipeHandlers}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Şanlıurfa</Text>
            <Text style={styles.headerSubtitle}>Büyükşehir Belediyesi</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Ionicons name="settings-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Story Bar */}
        <StoryBar />

        {/* Weather Widget */}
        <WeatherWidget />

        {/* News Slider */}
        <NewsSlider />

        {/* Grid Cards */}
        <View style={styles.gridContainer}>
          <Text style={styles.sectionTitle}>Hizmetler</Text>
          <View style={styles.grid}>
            <View style={styles.gridRow}>
              <HomeGridCard
                title="Ulaşım & UrfaKart"
                subtitle="Toplu taşıma ve kart işlemleri"
                icon="bus"
                iconColor={colors.primary}
                onPress={() => navigation.navigate('Transport')}
              />
              <HomeGridCard
                title="Turistik Yerler"
                subtitle="Göbeklitepe, Balıklıgöl ve daha fazlası"
                icon="map"
                iconColor={colors.gold}
                onPress={() => navigation.navigate('Tourist')}
              />
            </View>
            <View style={styles.gridRow}>
              <HomeGridCard
                title="Kültür-Sanat"
                subtitle="Etkinlik takvimi ve programlar"
                icon="calendar"
                iconColor={colors.secondary}
                onPress={() => navigation.navigate('Calendar')}
              />
              <HomeGridCard
                title="Nöbetçi Eczaneler"
                subtitle="Yakınındaki eczaneleri bul"
                icon="medical"
                iconColor={colors.rosy}
                onPress={() => navigation.navigate('Pharmacy')}
              />
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
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
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
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
    marginTop: 2,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  grid: {
    gap: 16,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 16,
  },
  bottomSpacing: {
    height: 32,
  },
});
