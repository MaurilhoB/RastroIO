import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FiArchive, FiCheckSquare, FiMenu } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import axios from 'axios';

import SideMenu from '../../components/SideMenu';
import { usePackages } from '../../hooks/packages';
import { useTheme } from '../../hooks/theme';
import api from '../../services/api';

import {
  Container,
  Header,
  Content,
  MenuToggleButton,
  OptionsContainer,
  ReceivedButton,
  ArchiveButton,
  TrackingContainer,
  MainStatus,
  Status,
  Row,
} from './styles';

interface SideMenuRef {
  toggleMenu(): void;
}

interface RouteParams {
  id: string;
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

const Track: React.FC = () => {
  const { theme } = useTheme();

  const sideMenuRef = useRef<SideMenuRef>(null);

  const toggleMenu = useCallback(() => {
    sideMenuRef.current?.toggleMenu();
  }, []);

  const { update, findById, moveTo, getPackageKey, packages } = usePackages();
  const { replace } = useHistory();

  const { id } = useParams<RouteParams>();

  const [events, setEvents] = useState<TrackEvent[]>([]);
  const [category, setCategory] = useState('');

  const eventsHistory = useMemo(() => events.slice(1), [events]);
  const lastEvent = useMemo(() => events[0], [events]);

  const receivedButtonHandle = useCallback(() => {
    moveTo(id, 'delivered');
    replace('/');
  }, [id, moveTo, replace]);

  const archiveButtonHandle = useCallback(() => {
    moveTo(id, 'archived');
    replace('/');
  }, [id, moveTo, replace]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const packageCategory = getPackageKey(id);

      if (packageCategory) {
        setCategory(packageCategory);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [packages, getPackageKey, id]);

  useEffect(() => {
    const packageData = findById(id);

    if (packageData?.hasUpdate) {
      update({ ...packageData, hasUpdate: false });
    }

    if (category === 'archived' || category === 'delivered') {
      if (packageData?.events) {
        setEvents(packageData.events);
      }
      return;
    }

    if (packageData?.updated_at && packageData.events.length) {
      const lastUpdate = new Date(packageData.updated_at).getTime();
      const now = new Date().getTime();

      if (now - lastUpdate < 300000) {
        setEvents(packageData.events);
        return;
      }
    }

    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        if (packageData) {
          const response = await api.post<AxiosTrackResponse>(
            'rastreio',
            {
              code: packageData.code,
              type: 'LS',
            },
            { cancelToken: source.token },
          );

          if (
            response.data.objeto &&
            Array.isArray(response.data.objeto) &&
            !response.data.objeto[0].categoria.includes('ERRO')
          ) {
            setEvents(response.data.objeto[0].evento);
            update({
              ...packageData,
              events: response.data.objeto[0].evento,
              updated_at: new Date().toISOString(),
            });
          }
        }
      } catch (e) {
        if (axios.isCancel(e)) {
          return;
        }
        const packageData = findById(id);

        if (packageData?.events) {
          setEvents(packageData.events);
        }
      }
    };
    fetchData();

    return () => source.cancel('Request cancelada');
  }, [findById, id, update, getPackageKey, category]);

  return (
    <Container>
      <SideMenu ref={sideMenuRef} />
      <Content>
        <Header>
          <MenuToggleButton onClick={toggleMenu}>
            <FiMenu size={24} color={theme.colors.text_primary} />
          </MenuToggleButton>
        </Header>
        {events.length > 0 && (
          <TrackingContainer>
            <OptionsContainer>
              {category === 'tracking' && (
                <ReceivedButton onClick={receivedButtonHandle}>
                  <FiCheckSquare />
                  Entregue
                </ReceivedButton>
              )}
              {category !== 'archived' && (
                <ArchiveButton onClick={archiveButtonHandle}>
                  <FiArchive />
                  Arquivar
                </ArchiveButton>
              )}
            </OptionsContainer>
            <MainStatus>
              <h1>Último Status do Objeto</h1>
              <Row>
                Status: <strong>{lastEvent.descricao}</strong>
              </Row>
              <Row>
                Data: {lastEvent.data} | Hora: {lastEvent.hora}
              </Row>
              <Row>
                Local: {lastEvent.unidade.tipounidade} -{' '}
                {lastEvent.unidade.cidade} / {lastEvent.unidade.uf}
              </Row>
              {lastEvent.destino && (
                <Row>
                  Destino: {lastEvent.destino[0].local} -{' '}
                  {lastEvent.destino[0].cidade} / {lastEvent.destino[0].uf}
                </Row>
              )}
            </MainStatus>
            {eventsHistory.map(event => (
              <Status key={event.criacao}>
                <Row>
                  Status: <strong>{event.descricao}</strong>
                </Row>
                <Row>
                  Data: {event.data} | Hora: {event.hora}
                </Row>
                <Row>
                  Local: {event.unidade.tipounidade} - {event.unidade.cidade} /{' '}
                  {event.unidade.uf}
                </Row>
                {event.destino && (
                  <Row>
                    Destino: {event.destino[0].local} -{' '}
                    {event.destino[0].cidade} / {event.destino[0].uf}
                  </Row>
                )}
              </Status>
            ))}
          </TrackingContainer>
        )}
      </Content>
    </Container>
  );
};

export default Track;
