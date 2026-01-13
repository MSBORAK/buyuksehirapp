import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface ForecastDay {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

interface WeatherModalProps {
  visible: boolean;
  onClose: () => void;
  currentTemp: number;
  currentCondition: string;
  location: string;
}


const forecastData: ForecastDay[] = [
  {
    day: 'Bugün',
    date: '15 Oca',
    high: 22,
    low: 12,
    condition: 'Açık',
    icon: 'sunny',
  },
  {
    day: 'Yarın',
    date: '16 Oca',
    high: 20,
    low: 10,
    condition: 'Parçalı Bulutlu',
    icon: 'partly-sunny',
  },
  {
    day: 'Çarşamba',
    date: '17 Oca',
    high: 18,
    low: 9,
    condition: 'Bulutlu',
    icon: 'cloudy',
  },
  {
    day: 'Perşembe',
    date: '18 Oca',
    high: 19,
    low: 11,
    condition: 'Parçalı Bulutlu',
    icon: 'partly-sunny',
  },
  {
    day: 'Cuma',
    date: '19 Oca',
    high: 21,
    low: 13,
    condition: 'Açık',
    icon: 'sunny',
  },
];

const getIconName = (icon: string): keyof typeof Ionicons.glyphMap => {
  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    sunny: 'sunny',
    'partly-sunny': 'partly-sunny',
    cloudy: 'cloudy',
    rainy: 'rainy',
    stormy: 'thunderstorm',
  };
  return iconMap[icon] || 'partly-sunny';
};

export default function WeatherModal({
  visible,
  onClose,
  currentTemp,
  currentCondition,
  location,
}: WeatherModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Ionicons name="partly-sunny" size={32} color={colors.accent} />
              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>Hava Durumu</Text>
                <Text style={styles.headerLocation}>{location}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={28} color={colors.pale} />
            </TouchableOpacity>
          </View>

          {/* Current Weather */}
          <View style={styles.currentWeather}>
            <Text style={styles.currentTemp}>{currentTemp}°</Text>
            <Text style={styles.currentCondition}>{currentCondition}</Text>
          </View>

          {/* Forecast List */}
          <ScrollView
            style={styles.forecastContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.forecastTitle}>5 Günlük Tahmin</Text>
            {forecastData.map((day, index) => (
              <View key={index} style={styles.forecastDay}>
                <View style={styles.forecastDayLeft}>
                  <View style={styles.dayInfo}>
                    <Text style={styles.dayName}>{day.day}</Text>
                    <Text style={styles.dayDate}>{day.date}</Text>
                  </View>
                  <Ionicons
                    name={getIconName(day.icon)}
                    size={32}
                    color={colors.accent}
                  />
                </View>
                <View style={styles.forecastDayRight}>
                  <Text style={styles.forecastCondition}>{day.condition}</Text>
                  <View style={styles.tempRange}>
                    <Text style={styles.highTemp}>{day.high}°</Text>
                    <Text style={styles.lowTemp}>{day.low}°</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'rgba(10, 51, 35, 0.95)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '85%',

    borderTopWidth: 1.5,
    borderTopColor: 'rgba(131, 153, 88, 0.3)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(131, 153, 88, 0.2)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(131, 153, 88, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,

    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(10, 51, 35, 0.92)',
      },
      android: {
        backgroundColor: 'rgba(10, 51, 35, 0.95)',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(131, 153, 88, 0.15)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    gap: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.pale,
  },
  headerLocation: {
    fontSize: 14,
    color: colors.textMuted,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(131, 153, 88, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(131, 153, 88, 0.3)',
  },
  currentWeather: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(131, 153, 88, 0.15)',
  },
  currentTemp: {
    fontSize: 64,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 8,
  },
  currentCondition: {
    fontSize: 18,
    color: colors.pale,
    fontWeight: '500',
  },
  forecastContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.pale,
    marginBottom: 16,
  },
  forecastDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(131, 153, 88, 0.1)',
  },
  forecastDayLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  dayInfo: {
    gap: 4,
    minWidth: 100,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.pale,
  },
  dayDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  forecastDayRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  forecastCondition: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'right',
  },
  tempRange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  highTemp: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.pale,
  },
  lowTemp: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textMuted,
  },
});
