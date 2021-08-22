import styled from 'styled-components';

interface MenuItemProps {
  bgcolor: string;
}

export const Container = styled.div`
  height: 100vh;
  min-width: 80px;
  background: ${props => props.theme.colors.surface};
  display: flex;
`;

export const Menu = styled.div`
  background: ${props => props.theme.colors.surface};
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  border-right-width: 2px;
  border-right-style: solid;
  border-right-color: ${props => props.theme.colors.text_secondary};
`;

export const MenuItem = styled.button<MenuItemProps>`
  width: 46px;
  height: 46px;
  border-radius: 10px;
  margin-top: 30px;
  background: ${props => props.bgcolor};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
  padding: 10px;

  &:hover {
    padding: 12px;
  }

  &:active {
    opacity: 0.8;
  }
`;
