import Modal from '../components/Modal';

import ModalProvider from './modal';
import PackagesProvider from './packages';
import AppThemeProvider from './theme';

const AppProvider: React.FC = ({ children }) => (
  <>
    <AppThemeProvider>
      <PackagesProvider>
        <ModalProvider>
          {children}
          <Modal />
        </ModalProvider>
      </PackagesProvider>
    </AppThemeProvider>
  </>
);

export default AppProvider;
