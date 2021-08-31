import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FiFilePlus, FiMenu, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import NothingHere from '../../components/NothingHere';

import SideMenu from '../../components/SideMenu';
import { usePackages } from '../../hooks/packages';
import { useTheme } from '../../hooks/theme';
import api from '../../services/api';

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

interface AxiosTrackResponse {
  objeto: [
    {
      categoria: string;
      evento: TrackEvent[];
    },
  ];
}

interface TrackEvent {
  data: string;
  hora: string;
  descricao: string;
  criacao: string;
  destino?: [
    {
      local: string;
      cidade: string;
      uf: string;
    },
  ];
  unidade: {
    tipounidade: string;
    cidade: string;
    uf: string;
  };
}

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);

  const sideMenuRef = useRef<SideMenuRef>(null);

  const toggleMenu = useCallback(() => {
    sideMenuRef.current?.toggleMenu();
  }, []);

  const { packages, update } = usePackages();

  const [searchValue, setSearchValue] = useState('');

  const trackingPackages = useMemo(() => {
    return packages.tracking.filter(packageData => {
      if (
        packageData.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        packageData.code.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }, [packages.tracking, searchValue]);

  const deliveredPackages = useMemo(() => {
    return packages.delivered.filter(packageData => {
      if (
        packageData.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        packageData.code.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }, [packages.delivered, searchValue]);

  const packageSearchHandle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
    },
    [],
  );

  useEffect(() => {
    const packagesToUpdate = packages.tracking.filter(packageData => {
      if (packageData?.updated_at && packageData.events.length) {
        const lastUpdate = new Date(packageData.updated_at).getTime();
        const now = new Date().getTime();

        if (now - lastUpdate < 600000) {
          return false;
        }
      }
      return true;
    });

    packagesToUpdate.forEach(packageData => {
      api
        .post<AxiosTrackResponse>('rastreio', {
          code: packageData.code,
          type: 'LS',
        })
        .then(response => {
          if (!response.data.objeto[0].categoria.includes('ERRO')) {
            update({
              ...packageData,
              events: response.data.objeto[0].evento,
              updated_at: new Date().toISOString(),
              hasUpdate: packageData.hasUpdate
                ? true
                : response.data.objeto[0].evento.length >
                  packageData.events.length,
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    });
  }, [packages.tracking, update]);
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
        <NewTrackContainer>
          <Link to="/new">
            <NewTrackButton>
              <FiFilePlus />
              <h4>Adicionar um novo</h4>
            </NewTrackButton>
          </Link>
        </NewTrackContainer>
        {trackingPackages.length || deliveredPackages.length ? (
          <CardsContainer>
            {trackingPackages.length ? (
              <Card title="Pendentes" items={trackingPackages} />
            ) : null}
            {deliveredPackages.length ? (
              <Card title="Entregues" items={deliveredPackages} />
            ) : null}
          </CardsContainer>
        ) : packages.tracking.length > 0 ||
          packages.delivered.length > 0 ? null : (
          <NothingHere />
        )}
      </Content>
    </Container>
  );
};

export default Dashboard;
