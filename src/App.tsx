import React from 'react';
import AppThemeProvider from './hooks/theme';
import Dashboard from './pages/Dashboard';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <AppThemeProvider>
      <Dashboard />
    </AppThemeProvider>
    <GlobalStyle />
  </>
);

export default App;
