import React, { useCallback, useRef, useState } from 'react';
import { FiFilePlus, FiMenu, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';

import SideMenu from '../../components/SideMenu';
import { usePackages } from '../../hooks/packages';
import { useTheme } from '../../hooks/theme';

import {
  Container,
  Header,
  Content,
  MenuToggleButton,
  SearchBox,
  SearchInput,
  CardsContainer,
  NewTrackContainer,
  NewTrackButton,
} from './styles';

interface SideMenuRef {
  toggleMenu(): void;
}

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);

  const sideMenuRef = useRef<SideMenuRef>(null);

  const toggleMenu = useCallback(() => {
    sideMenuRef.current?.toggleMenu();
  }, []);

  const { packages, create } = usePackages();

  return (
    <Container>
      <SideMenu ref={sideMenuRef} />
      <Content>
        <Header>
          <MenuToggleButton onClick={toggleMenu}>
            <FiMenu size={24} color={theme.colors.text_primary} />
          </MenuToggleButton>
          <SearchBox isFocused={focused}>
            <SearchInput
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Buscar um pacote"
              name="search"
            />
            <FiSearch size={26} color={theme.colors.text_primary} />
          </SearchBox>
        </Header>
        <NewTrackContainer>
          <Link to="/new">
            <NewTrackButton>
              <FiFilePlus />
              <h4>Adicionar um novo</h4>
            </NewTrackButton>
          </Link>
        </NewTrackContainer>
        <CardsContainer>
          <Card title="Pendentes" items={packages.tracking} />
          <Card title="Entregues" items={packages.delivered} />
        </CardsContainer>
      </Content>
    </Container>
  );
};

export default Dashboard;
