import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import TouristStack from '../../screens/tourist/TouristStack';
import TransportScreen from '../../screens/transport/TransportScreen';
import CalendarScreen from '../../screens/calendar/CalendarScreen';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Tourist') iconName = 'map';
          else if (route.name === 'Transport') iconName = 'bus';
          else if (route.name === 'Calendar') iconName = 'calendar';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tourist" component={TouristStack} />
      <Tab.Screen name="Transport" component={TransportScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
}
