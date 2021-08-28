import PackagesProvider from './packages';
import AppThemeProvider from './theme';

const AppProvider: React.FC = ({ children }) => (
  <AppThemeProvider>
    <PackagesProvider>{children}</PackagesProvider>
  </AppThemeProvider>
);

export default AppProvider;
