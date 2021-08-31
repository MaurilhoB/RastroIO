import styled from 'styled-components';
import { animated } from '@react-spring/web';

interface SearchBoxProps {
  isFocused: boolean;
}

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

export const SearchBox = styled.div<SearchBoxProps>`
  background: ${props => props.theme.colors.background_primary};
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 0 20px;
  flex: 1;
  border: 2px solid
    ${({ theme, isFocused }) =>
      isFocused ? theme.colors.primary : 'transparent'};
`;

export const SearchInput = styled.input`
  padding: 15px 10px;
  color: ${props => props.theme.colors.text_primary};
  font-family: 'Poppins', sans-serif;
  background: transparent;
  outline: none;
  border: 0;
  flex: 1;
`;

export const ArchivedContainer = styled(animated.div)`
  background: ${props => props.theme.colors.surface};
  max-width: 90%;
  margin: 30px auto 0px;
  border-radius: 10px;
  padding: 20px 30px;
  box-shadow: 1px 1px ${props => props.theme.colors.border};

  a {
    text-decoration: none;
    flex: 1;
  }

  & > div:last-child {
    box-shadow: 0px 0px transparent;
  }
`;

export const ArchivedItem = styled.div`
  box-shadow: 0px 1px ${props => props.theme.colors.border};
  padding: 14px 0px;
  display: flex;
  align-items: center;
`;

export const MetaContainer = styled.div``;

export const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: ${props => props.theme.colors.text_primary};
`;

export const Code = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text_primary};
`;

export const DeleteArchivedButton = styled.button`
  margin-left: auto;
  background: #e76f51;
  border: 0;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
`;

export const WarningContainer = styled.div`
  font-family: 'Poppins', sans-serif;
`;

export const WarningTitle = styled.h2`
  color: ${props => props.theme.colors.text_primary};
`;

export const WarningMessage = styled.p`
  margin: 10px 0px;
  color: ${props => props.theme.colors.text_secondary};
`;

export const WarningConfirmButton = styled.button`
  font-family: 'Poppins', sans-serif;
  border: 0;
  padding: 10px;
  background: #e76f51;
  border-radius: 10px;
  font-weight: 500;
  color: #fff;
  transition: scale 0.3s ease-in-out;

  &:active {
    transform: scale(0.9);
  }

  cursor: pointer;
`;
