import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import WeatherModal from './WeatherModal';

export default function WeatherWidget() {
  const [modalVisible, setModalVisible] = useState(false);
  
  // Mock data - later integrate with OpenWeather API
  const temperature = 22;
  const condition = 'Açık';
  const location = 'Şanlıurfa';

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.content}>
          <View style={styles.leftSection}>
            <Ionicons name="partly-sunny" size={40} color={colors.accent} />
            <View style={styles.tempContainer}>
              <Text style={styles.temperature}>{temperature}°</Text>
              <Text style={styles.condition}>{condition}</Text>
            </View>
          </View>
          <View style={styles.rightSection}>
            <Text style={styles.location}>{location}</Text>
            <Ionicons name="location" size={16} color={colors.textMuted} />
          </View>
        </View>
      </TouchableOpacity>

      <WeatherModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        currentTemp={temperature}
        currentCondition={condition}
        location={location}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tempContainer: {
    gap: 4,
  },
  temperature: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textOnSurface, // Koyu metin açık yüzey üzerinde
  },
  condition: {
    fontSize: 14,
    color: colors.textMuted, // Koyu metin açık yüzey üzerinde
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  location: {
    fontSize: 14,
    color: colors.textMuted, // Koyu metin açık yüzey üzerinde
    fontWeight: '500',
  },
});
