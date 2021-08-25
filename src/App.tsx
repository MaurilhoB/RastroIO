import React from 'react';
import AppProvider from './hooks';
import Archived from './pages/Archived';
import Dashboard from './pages/Dashboard';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <AppProvider>
    <Archived />
    <GlobalStyle />
  </AppProvider>
);

export default App;
