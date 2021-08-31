import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const Content = styled.main`
  flex: 1;
`;

export const Header = styled.header`
  height: 85px;

  display: flex;
  align-items: center;

  background: ${props => props.theme.colors.surface};
  box-shadow: 0px 1px ${props => props.theme.colors.border};

  padding: 0 30px;

  @media (max-width: 580px) {
    padding: 0;
  }
`;

export const MenuToggleButton = styled.button`
  padding: 10px;
  border-radius: 6px;
  border: 0;
  background: ${props => props.theme.colors.background_primary};
  margin: 0px 8px 0px 8px;
  display: none;
  cursor: pointer;

  &:active {
    transform: scale(0.97);
    box-shadow: 0.5px 0.5px ${props => props.theme.colors.border};
  }

  @media screen and (max-width: 580px) {
    display: flex;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  @media screen and (max-width: 580px) {
    justify-content: center;
  }
`;

export const ReceivedButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-right: 8px;
  border-radius: 10px;
  border: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;

  box-shadow: 2px 2px 2px ${props => props.theme.colors.border};

  background: #00e676;
  color: #fff;

  transition: scale 0.2s linear;

  > svg {
    margin-right: 4px;
    font-size: 1rem;
  }

  &:active {
    transform: scale(0.99);
  }

  cursor: pointer;
`;

export const ArchiveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  border: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;

  box-shadow: 2px 2px 2px ${props => props.theme.colors.border};

  background: #f1ac38;
  color: #fff;

  transition: scale 0.2s linear;

  > svg {
    margin-right: 4px;
    font-size: 1rem;
  }

  &:active {
    transform: scale(0.99);
  }

  cursor: pointer;
`;

export const TrackingContainer = styled.div`
  max-width: 90%;
  margin: 0px auto;
`;

export const MainStatus = styled.div`
  background: ${props => props.theme.colors.surface};
  box-shadow: 1px 1px 0px ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  margin: 10px 0px 30px;
  padding: 20px;
  border-radius: 10px;

  h1 {
    font-size: 20px;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    color: ${props => props.theme.colors.text_primary};
    margin-bottom: 10px;

    &::before {
      content: '';
      margin-right: 8px;
      border-left-width: 2px;
      border-left-style: solid;
      border-left-color: ${props => props.theme.colors.primary};
    }
  }
`;

export const Status = styled.div`
  background: ${props => props.theme.colors.surface};
  box-shadow: 1px 1px 0px ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;

  div + & {
    margin-bottom: 10px;
  }
`;

export const Row = styled.div`
  font-family: 'Poppins', sans-serif;
  color: ${props => props.theme.colors.text_primary};

  strong {
    font-weight: 600;
  }
`;
