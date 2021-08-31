import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

interface IModalProps {
  id: string;
  component: React.ComponentType;
  onClose?: () => void;
}

interface ModalContextData {
  modals: IModalProps[];
  addModal(data: Omit<IModalProps, 'id'>): void;
  removeModal(id: string): void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const ModalProvider: React.FC = ({ children }) => {
  const [modals, setModals] = useState<IModalProps[]>([]);

  const addModal = useCallback(
    ({ component, onClose }: Omit<IModalProps, 'id'>) => {
      const modal = {
        id: uuid(),
        component,
        onClose,
      };

      setModals(prev => [...prev, modal]);
    },
    [setModals],
  );

  const removeModal = useCallback(
    (id: string) => {
      setModals(prev => prev.filter(modal => modal.id !== id));
    },
    [setModals],
  );

  return (
    <ModalContext.Provider value={{ modals, addModal, removeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('You can use this hook just inside AppThemeProvider');
  }

  return context;
}
