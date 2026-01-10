import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TouristScreen from './TouristScreen';
import TouristDetailScreen from './TouristDetailScreen';
import TouristMapScreen from './TouristMapScreen';

const Stack = createNativeStackNavigator();

export default function TouristStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TouristHome" component={TouristScreen} />
      <Stack.Screen name="TouristDetail" component={TouristDetailScreen} />
      <Stack.Screen name="TouristMap" component={TouristMapScreen} />
    </Stack.Navigator>
  );
}
