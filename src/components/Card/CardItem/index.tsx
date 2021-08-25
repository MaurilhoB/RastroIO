import React from 'react';
import { FiEdit, FiPackage, FiTrash } from 'react-icons/fi';

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
  title: string;
  code: string;
}

const CardItem: React.FC<ICardItemProps> = ({ code, title }) => {
  return (
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
        <IconButton color="#e76f51">
          <FiTrash color="#fff" />
        </IconButton>
      </OptionsContainer>
    </Container>
  );
};

export default CardItem;
