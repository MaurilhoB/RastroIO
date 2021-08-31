import styled from 'styled-components';
import { animated } from '@react-spring/web';

export const Container = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px;
`;

export const ModalContainer = styled(animated.div)`
  background: ${props => props.theme.colors.surface};
  border-radius: 10px;
  box-shadow: 0px 0px 0px 1.5px ${props => props.theme.colors.border};
  display: flex;
  padding: 30px;
  padding-right: 50px;
  margin: 0 auto;
  position: relative;
`;

export const ModalCloseButton = styled.button`
  padding: 5px;
  background: transparent;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  border: 0;

  > svg {
    width: 20px;
    height: 20px;
    color: ${props => props.theme.colors.text_primary};
  }
`;
