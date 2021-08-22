import React from 'react';
import AppThemeProvider from './hooks/theme';
import Dashboard from './pages/Dashboard';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <AppThemeProvider>
      <Dashboard />
      <GlobalStyle />
    </AppThemeProvider>
  </>
);

export default App;
