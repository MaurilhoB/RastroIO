import styled from 'styled-components';
import { animated } from '@react-spring/web';

interface MenuItemProps {
  bgcolor: string;
}

export const Container = styled(animated.div)`
  max-width: 80px;
  min-height: 100vh;
  background: ${props => props.theme.colors.surface};
  display: flex;
  flex: 1;
`;

export const Menu = styled.div`
  background: ${props => props.theme.colors.surface};
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 0px ${props => props.theme.colors.border};
  margin-right: 1px;
  padding: 0 10px;
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
