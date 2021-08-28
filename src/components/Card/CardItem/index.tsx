import React, { useCallback, useState } from 'react';

import { FiEdit, FiPackage, FiTrash } from 'react-icons/fi';
import { usePackages } from '../../../hooks/packages';

import Modal from '../../Modal';

import {
  Container,
  CardIconContainer,
  CardMetaContainer,
  CardItemTitle,
  CardItemCode,
  OptionsContainer,
  IconButton,
} from './styles';

interface ICardItemProps {
  id: string;
  title: string;
  code: string;
}

const CardItem: React.FC<ICardItemProps> = ({ code, title, id }) => {
  const [showModal, setShowModal] = useState(false);
  const { dropFrom } = usePackages();

  const deleteCardHandle = useCallback(() => {
    setShowModal(true);
  }, []);

  return (
    <>
      <Container>
        <CardIconContainer>
          <FiPackage size={22} color="#fff" />
        </CardIconContainer>
        <CardMetaContainer>
          <CardItemTitle>{title}</CardItemTitle>
          <CardItemCode>{code}</CardItemCode>
        </CardMetaContainer>
        <OptionsContainer>
          <IconButton color="#4895ef">
            <FiEdit color="#fff" />
          </IconButton>
          <IconButton color="#e76f51" onClick={deleteCardHandle}>
            <FiTrash color="#fff" />
          </IconButton>
        </OptionsContainer>

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <h1>Lorem ipsum dolor sit amet nandesuka</h1>
            <button onClick={() => dropFrom({ id, key: 'tracking' })}>
              Deletar
            </button>
          </Modal>
        )}
      </Container>
    </>
  );
};

export default CardItem;
