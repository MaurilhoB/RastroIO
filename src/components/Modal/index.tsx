import React, { useCallback } from 'react';

import { useTransition } from '@react-spring/web';
import { FiX } from 'react-icons/fi';

import { Container, ModalContainer, ModalCloseButton } from './styles';
import { useModal } from '../../hooks/modal';

const Modal: React.FC = () => {
  const { modals, removeModal } = useModal();

  const transitions = useTransition(modals, {
    from: { top: '-100%' },
    enter: { top: '0%' },
    leave: { top: '-100%' },
    keys: modal => modal.id,
  });

  const closeModalHandle = useCallback(
    (id: string, onClose?: () => void) => {
      removeModal(id);

      if (onClose) {
        onClose();
      }
    },
    [removeModal],
  );

  return transitions((styles, { id, onClose, component: Component }) => {
    return (
      <Container key={id} onClick={() => closeModalHandle(id, onClose)}>
        <ModalContainer style={styles}>
          <ModalCloseButton onClick={() => closeModalHandle(id, onClose)}>
            <FiX />
          </ModalCloseButton>
          <Component />
        </ModalContainer>
      </Container>
    );
  });
};

export default Modal;
