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
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.accent,
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
