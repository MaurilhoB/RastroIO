import styled from 'styled-components';
import { animated } from '@react-spring/web';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  z-index: 1999;
`;

export const ModalContainer = styled(animated.div)`
  background: ${props => props.theme.colors.surface};
  border-radius: 10px;
  box-shadow: 0px 0px 0px 1.5px ${props => props.theme.colors.border};
  position: relative;
  padding: 30px;
  padding-right: 50px;
`;

export const ModalCloseButton = styled.button`
  padding: 5px;
  background: ${props => props.theme.colors.background_primary};
  position: absolute;
  right: 18px;
  top: 18px;
  border-radius: 10px;
  cursor: pointer;
  border: 0;

  > svg {
    width: 20px;
    height: 20px;
  }
`;
