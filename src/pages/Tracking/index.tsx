import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FiMenu } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

import SideMenu from '../../components/SideMenu';
import { usePackages } from '../../hooks/packages';
import { useTheme } from '../../hooks/theme';
import api from '../../services/api';

import {
  Container,
  Header,
  Content,
  MenuToggleButton,
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
      evento: TrackEvent[];
    },
  ];
}

interface TrackEvent {
  data: string;
  hora: string;
  descricao: string;
  criacao: string;
  unidade: {
    tipounidade: string;
    cidade: string;
    uf: string;
  };
}

const Track: React.FC = () => {
  const { theme } = useTheme();
  const { findCodeById } = usePackages();

  const sideMenuRef = useRef<SideMenuRef>(null);

  const toggleMenu = useCallback(() => {
    sideMenuRef.current?.toggleMenu();
  }, []);

  const [events, setEvents] = useState<TrackEvent[]>([]);

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    const trackCode = findCodeById(id);

    if (!trackCode) {
      return;
    }
    api
      .post<AxiosTrackResponse>('rastreio', {
        code: trackCode,
        type: 'LS',
      })
      .then(response => {
        setEvents(response.data.objeto[0].evento);
      });
  }, []);

  const eventsHistory = useMemo(() => events.slice(1), [events]);
  const lastEvent = useMemo(() => events[0], [events]);

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
              </Status>
            ))}
          </TrackingContainer>
        )}
      </Content>
    </Container>
  );
};

export default Track;
