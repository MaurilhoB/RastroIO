import styled from 'styled-components';

interface IconButtonProps {
  color?: string;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  & > div:last-child {
    opacity: 0;
    transition: all 0.4s;
  }

  &:hover > :last-child {
    opacity: 1;
  }
`;

export const CardIconContainer = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #f1ac38;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

export const CardMetaContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px 30px;
  margin-left: 15px;
`;

export const CardItemTitle = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: ${props => props.theme.colors.text_secondary};
`;

export const CardItemCode = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text_primary};
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 8px;
`;

export const IconButton = styled.button<IconButtonProps>`
  padding: 8px;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 5px;
  margin: 3px;
  cursor: pointer;
  background: ${props => props.color || props.theme.colors.primary};
`;
