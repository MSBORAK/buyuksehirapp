import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './tabs/BottomTabs';
import PharmacyScreen from '../screens/pharmacy/PharmacyScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import SocialFacilityDetailScreen from '../screens/social/SocialFacilityDetailScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background, // Dark green - Koyu doğal background
    card: colors.surface, // Beige - Açık kartlar koyu arka plan üzerinde
    text: colors.text, // Beige - Açık metin koyu arka plan üzerinde
    border: colors.border, // Moss green toned border
    notification: colors.accent, // Moss green - Notification badge
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Pharmacy" component={PharmacyScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="SocialDetail" component={SocialFacilityDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
