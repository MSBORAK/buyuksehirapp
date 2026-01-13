import { useRef } from 'react';
import { PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function useSwipeGesture(routeName: string) {
  const navigation = useNavigation<any>();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {

        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
      },
      onPanResponderRelease: (_, gestureState) => {
        const tabRoutes = ['Home', 'Tourist', 'Transport', 'Calendar', 'Social'];
        const currentIndex = tabRoutes.indexOf(routeName);

        if (Math.abs(gestureState.dx) > 50) {
          if (gestureState.dx > 0 && currentIndex > 0) {

            navigation.navigate(tabRoutes[currentIndex - 1]);
          } else if (gestureState.dx < 0 && currentIndex < tabRoutes.length - 1) {

            navigation.navigate(tabRoutes[currentIndex + 1]);
          }
        }
      },
    })
  ).current;

  return panResponder.panHandlers;
}
