import React from 'react';
import AppProvider from './hooks';
import Dashboard from './pages/Dashboard';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <AppProvider>
    <Dashboard />
    <GlobalStyle />
  </AppProvider>
);

export default App;
