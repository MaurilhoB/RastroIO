import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSpring } from '@react-spring/web';

import { FiMenu, FiSearch, FiTrash } from 'react-icons/fi';
import NothingHere from '../../components/NothingHere';

import SideMenu from '../../components/SideMenu';
import { useModal } from '../../hooks/modal';
import { usePackages } from '../../hooks/packages';
import { useTheme } from '../../hooks/theme';
import { Link } from 'react-router-dom';

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
  WarningContainer,
  WarningTitle,
  WarningMessage,
  WarningConfirmButton,
} from './styles';

interface SideMenuRef {
  toggleMenu(): void;
}

const Archived: React.FC = () => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);
  const { drop, packages } = usePackages();

  const [searchValue, setSearchValue] = useState('');

  const archivedPackages = useMemo(() => {
    return packages.archived.filter(packageData => {
      if (
        packageData.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        packageData.code.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }, [packages.archived, searchValue]);

  const { addModal } = useModal();

  const sideMenuRef = useRef<SideMenuRef>(null);

  const toggleMenu = useCallback(() => {
    sideMenuRef.current?.toggleMenu();
  }, []);

  const [{ scale }, set] = useSpring(() => ({
    scale: 0,
  }));

  useEffect(() => {
    set({ scale: 1 });
  }, [set]);

  const deletePackageHandle = useCallback(
    (id: string) => {
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
    },
    [addModal, drop],
  );

  const packageSearchHandle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
    },
    [],
  );

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
              onChange={packageSearchHandle}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Buscar um pacote"
              name="search"
            />
            <FiSearch size={26} color={theme.colors.text_primary} />
          </SearchBox>
        </Header>
        {archivedPackages.length > 0 ? (
          <ArchivedContainer style={{ scale }}>
            {archivedPackages.map(packageData => (
              <ArchivedItem key={packageData.id}>
                <Link to={`/track/${packageData.id}`}>
                  <MetaContainer>
                    <Title>{packageData.title}</Title>
                    <Code>{packageData.code}</Code>
                  </MetaContainer>
                </Link>
                <DeleteArchivedButton
                  onClick={() => deletePackageHandle(packageData.id)}
                >
                  <FiTrash size={15} color="#fff" />
                </DeleteArchivedButton>
              </ArchivedItem>
            ))}
          </ArchivedContainer>
        ) : packages.archived.length > 0 ? null : (
          <NothingHere />
        )}
      </Content>
    </Container>
  );
};

export default Archived;
