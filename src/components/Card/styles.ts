import styled from 'styled-components';
import { animated } from '@react-spring/web';

export const Container = styled(animated.div)`
  background: ${props => props.theme.colors.surface};
  margin: 10px;
  border-radius: 10px;
  box-shadow: 1.2px 1.2px ${props => props.theme.colors.border};
  padding: 10px 0px 8px 8px;

  & > div:last-child > div {
    border: 0;
  }
`;

export const CardTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 500;
  margin: 10px 20px;
  color: ${props => props.theme.colors.text_primary};
`;
