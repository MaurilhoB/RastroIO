import styled from 'styled-components';

interface SearchBoxProps {
  isFocused: boolean;
}

export const Container = styled.div`
  display: flex;
`;

export const Header = styled.header`
  height: 85px;
  background: ${props => props.theme.colors.surface};
  border-bottom-color: ${props => props.theme.colors.text_secondary};
  border-bottom-width: 2px;
  border-bottom-style: solid;
  display: flex;
  align-items: center;
  padding: 0 30px;
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
  font-family: 'Poppins';
  background: transparent;
  outline: none;
  border: 0;
  flex: 1;
`;

export const Content = styled.main`
  flex: 1;
`;
