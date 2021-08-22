import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import SideMenu from '../../components/SideMenu';
import { useTheme } from '../../hooks/theme';

import { Container, Header, Content, SearchBox, SearchInput } from './styles';

const Dashboard: React.FC = () => {
  const { theme } = useTheme();

  const [focused, setFocused] = useState(false);

  return (
    <Container>
      <SideMenu />
      <Content>
        <Header>
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
      </Content>
    </Container>
  );
};

export default Dashboard;
