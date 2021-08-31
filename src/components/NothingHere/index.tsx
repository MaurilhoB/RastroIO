import React from 'react';
import backgroundImage from '../../assets/space.svg';

import { Container, Content } from './styles';

const NothingHere: React.FC = () => (
  <Container>
    <Content>
      <img src={backgroundImage} alt="Nada aqui" />
      <p>Nada aqui, tente adicionar algo</p>
    </Content>
  </Container>
);

export default NothingHere;
