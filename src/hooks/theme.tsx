import React, { createContext, useCallback, useContext } from 'react';

import { DefaultTheme, ThemeProvider } from 'styled-components';
import usePersistedState from './usePersistedState';

import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

interface AppThemeContextData {
  theme: DefaultTheme;
  toggleTheme(): void;
}

const AppThemeContext = createContext<AppThemeContextData>(
  {} as AppThemeContextData,
);

const AppThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>(
    '@RastroIO:theme',
    light,
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
  }, [setTheme, theme.title]);

  return (
    <AppThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export default AppThemeProvider;

export function useTheme() {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error('You can use this hook just inside AppThemeProvider');
  }

  return context;
}
