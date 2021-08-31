import styled from 'styled-components';

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

export const CardsContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  @media screen and (max-width: 580px) {
    justify-content: center;
  }
`;

export const NewTrackContainer = styled.div`
  display: flex;
  padding: 12px 30px 0px;

  a {
    text-decoration: none;
  }
`;

export const NewTrackButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${props => props.theme.colors.primary};
  border-radius: 10px;
  border: 0;
  color: #fff;

  transition: scale 0.2s linear;

  &:active {
    transform: scale(0.99);
  }

  cursor: pointer;

  > h4 {
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
  }

  > svg {
    width: 22px;
    height: 22px;
    margin-right: 8px;
  }
`;
