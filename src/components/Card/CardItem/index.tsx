import React, { useCallback } from 'react';

import { Link } from 'react-router-dom';

import { FiEdit, FiPackage, FiTrash } from 'react-icons/fi';
import { usePackages } from '../../../hooks/packages';

import {
  Container,
  CardIconContainer,
  CardMetaContainer,
  CardItemTitle,
  CardItemCode,
  OptionsContainer,
  IconButton,
  WarningContainer,
  WarningTitle,
  WarningMessage,
  WarningConfirmButton,
} from './styles';

import { useModal } from '../../../hooks/modal';

interface ICardItemProps {
  id: string;
  title: string;
  code: string;
  hasUpdate: boolean;
}

const CardItem: React.FC<ICardItemProps> = ({ code, title, id, hasUpdate }) => {
  const { drop } = usePackages();

  const { addModal } = useModal();

  const deleteCardHandle = useCallback(() => {
    addModal({
      component: () => (
        <WarningContainer>
          <WarningTitle>Aviso!</WarningTitle>
          <WarningMessage>
            Deseja mesmo remover o pacote?, esta ação não pode ser desfeita
          </WarningMessage>
          <WarningConfirmButton onClick={() => drop(id)}>
            Confirmar
          </WarningConfirmButton>
        </WarningContainer>
      ),
    });
  }, [addModal, drop, id]);

  return (
    <Container hasUpdate={hasUpdate}>
      <Link to={`/track/${id}`}>
        <CardIconContainer>
          <FiPackage size={22} color="#fff" />
        </CardIconContainer>
        <CardMetaContainer>
          <CardItemTitle>{title}</CardItemTitle>
          <CardItemCode>{code}</CardItemCode>
        </CardMetaContainer>
      </Link>
      <OptionsContainer>
        <Link to={`/edit/${id}`}>
          <IconButton color="#4895ef">
            <FiEdit color="#fff" />
          </IconButton>
        </Link>
        <IconButton color="#e76f51" onClick={deleteCardHandle}>
          <FiTrash color="#fff" />
        </IconButton>
      </OptionsContainer>
    </Container>
  );
};

export default CardItem;
