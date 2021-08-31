import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  p {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    color: ${props => props.theme.colors.text_primary};
  }
`;
