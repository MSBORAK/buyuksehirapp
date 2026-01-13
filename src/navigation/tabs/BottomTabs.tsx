import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import TouristStack from '../../screens/tourist/TouristStack';
import TransportScreen from '../../screens/transport/TransportScreen';
import CalendarScreen from '../../screens/calendar/CalendarScreen';
import SocialFacilitiesScreen from '../../screens/social/SocialFacilitiesScreen';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tourist') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Transport') {
            iconName = focused ? 'bus' : 'bus-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Social') {
            iconName = focused ? 'business' : 'business-outline';
          }

          return (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <Ionicons
                name={iconName}
                size={focused ? 26 : 22}
                color={focused ? colors.pale : colors.primary}
              />
            </View>
          );
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 9,
          marginBottom: Platform.OS === 'ios' ? -10: -10,
          letterSpacing: 0.4,
        },
        tabBarItemStyle: {
          paddingBottom: Platform.OS === 'ios' ? 4 : 2,
        },
        tabBarActiveTintColor: colors.textOnSurface,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Ana Sayfa' }}
        listeners={{
          focus: () => {

          },
        }}
      />
      <Tab.Screen
        name="Tourist"
        component={TouristStack}
        options={{ tabBarLabel: 'Turistik' }}
      />
      <Tab.Screen
        name="Transport"
        component={TransportScreen}
        options={{ tabBarLabel: 'Ulaşım' }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ tabBarLabel: 'Etkinlikler' }}
      />
      <Tab.Screen
        name="Social"
        component={SocialFacilitiesScreen}
        options={{ tabBarLabel: 'Tesisler' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 85 : 75,
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    elevation: 35,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.6,
    shadowRadius: 28,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    marginHorizontal: 10,
    marginBottom: Platform.OS === 'ios' ? 16 : 12,
    borderRadius: 28,

    borderWidth: 1.5,
    borderColor: 'rgba(10,51,35,0.2)',

    ...Platform.select({
      ios: {
        shadowColor: colors.gold,
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      },
      android: {
        elevation: 40,
      },
    }),
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'transparent',
    marginTop: 4,
    marginBottom: 6,
  },
  iconContainerActive: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 14,
    elevation: 14,
    marginTop: -6,

    borderWidth: 2.5,
    borderColor: colors.gold,

    ...Platform.select({
      ios: {
        shadowColor: colors.gold,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
    }),
  },
});
