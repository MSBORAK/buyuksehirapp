import React, { ReactNode, createContext } from 'react';
import { StatusBar } from 'react-native';
import { colors } from './colors';

interface ThemeContextProps {
  colors: typeof colors;
}

export const ThemeContext = createContext<ThemeContextProps>({ colors });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={{ colors }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {children}
    </ThemeContext.Provider>
  );
};
