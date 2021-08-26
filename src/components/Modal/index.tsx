import React, { useState, useCallback } from 'react';

import { useTransition } from '@react-spring/web';
import { FiX } from 'react-icons/fi';

import { Container, ModalContainer, ModalCloseButton } from './styles';

interface ModalProps {
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const [shown, setShown] = useState(true);

  const transition = useTransition(shown, {
    from: { top: '-100%' },
    enter: { top: '0%' },
    leave: { top: '-100%' },
    onRest: (e: any) => {
      if (e.value.top === '-100%' && onClose) {
        onClose();
      }
    },
  });

  const closeModalHandle = useCallback(() => {
    setShown(false);
  }, []);

  return transition(
    (styles, item) =>
      item && (
        <Container onClick={closeModalHandle}>
          <ModalContainer style={styles}>
            <ModalCloseButton onClick={closeModalHandle}>
              <FiX />
            </ModalCloseButton>
            {children}
          </ModalContainer>
        </Container>
      ),
  );
};

export default Modal;
