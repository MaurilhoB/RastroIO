import styled from 'styled-components';

interface IconButtonProps {
  color?: string;
}

interface ContainerProps {
  hasUpdate: boolean;
}

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

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 5px;
  cursor: pointer;

  background: ${props =>
    props.hasUpdate ? 'rgb(166, 148, 230, .15)' : 'transparent'};

  > a {
    display: flex;
    flex: 1;
    align-items: center;
    text-decoration: none;
  }

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
