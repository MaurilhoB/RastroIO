import React, { useCallback, useRef, useState } from 'react';

import { FiMenu, FiSearch, FiTrash } from 'react-icons/fi';

import SideMenu from '../../components/SideMenu';
import { useTheme } from '../../hooks/theme';

import {
  Container,
  Header,
  Content,
  MenuToggleButton,
  SearchBox,
  SearchInput,
  ArchivedItem,
  ArchivedContainer,
  Code,
  Title,
  DeleteArchivedButton,
  MetaContainer,
} from './styles';

interface SideMenuRef {
  toggleMenu(): void;
}

const Archived: React.FC = () => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);

  const sideMenuRef = useRef<SideMenuRef>(null);

  const toggleMenu = useCallback(() => {
    sideMenuRef.current?.toggleMenu();
  }, []);

  const [userPackages, setUserPackages] = useState(() => [
    {
      title: 'Card Item Title',
      code: 'PZ0214054194BR',
    },
    {
      title: 'Card Item Title 2',
      code: 'PZ02140214194BR',
    },
    {
      title: 'Card Item Title 3',
      code: 'PZ02140494194BR',
    },
    {
      title: 'Card Item Title 4',
      code: 'PZ02165404194BR',
    },
    {
      title: 'Card Item Title 5',
      code: 'PZ026680404194BR',
    },
  ]);

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
        <ArchivedContainer>
          <ArchivedItem>
            <MetaContainer>
              <Title>Archived Item 1</Title>
              <Code>PA30129013013BR</Code>
            </MetaContainer>
            <DeleteArchivedButton>
              <FiTrash size={15} color="#fff" />
            </DeleteArchivedButton>
          </ArchivedItem>
          <ArchivedItem>
            <MetaContainer>
              <Title>Archived Item 2</Title>
              <Code>PA30129013013BR</Code>
            </MetaContainer>
            <DeleteArchivedButton>
              <FiTrash size={15} color="#fff" />
            </DeleteArchivedButton>
          </ArchivedItem>
        </ArchivedContainer>
      </Content>
    </Container>
  );
};

export default Archived;
