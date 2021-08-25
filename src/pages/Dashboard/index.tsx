import React, { useCallback, useRef, useState } from 'react';
import { FiMenu, FiSearch } from 'react-icons/fi';
import Card from '../../components/Card';

import SideMenu from '../../components/SideMenu';
import { useTheme } from '../../hooks/theme';

import {
  Container,
  Header,
  Content,
  MenuToggleButton,
  SearchBox,
  SearchInput,
  CardsContainer,
} from './styles';

interface SideMenuRef {
  toggleMenu(): void;
}

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);

  const sideMenuRef = useRef<SideMenuRef>(null);

  const toggleMenu = useCallback(() => {
    sideMenuRef.current?.toggleMenu()
  }, [])

  const [userPackages, setUserPackages] = useState(() => ([
    {
      title: 'Card Item Title',
      code: 'PZ0214054194BR'
    },
    {
      title: 'Card Item Title 2',
      code: 'PZ02140214194BR'
    },
    {
      title: 'Card Item Title 3',
      code: 'PZ02140494194BR'
    },
    {
      title: 'Card Item Title 4',
      code: 'PZ02165404194BR'
    },
    {
      title: 'Card Item Title 5',
      code: 'PZ026680404194BR'
    },
  ]))

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
        <CardsContainer>
          <Card title="Pendentes" items={userPackages}/>
          <Card title="Entregues" items={userPackages}/>
        </CardsContainer>
      </Content>
    </Container>
  );
};

export default Dashboard;
