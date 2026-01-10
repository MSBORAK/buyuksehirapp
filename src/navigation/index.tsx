import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './tabs/BottomTabs';
import PharmacyScreen from '../screens/pharmacy/PharmacyScreen';

const Stack = createNativeStackNavigator();

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F9F9F9',
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Pharmacy" component={PharmacyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
