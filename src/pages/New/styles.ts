import styled from 'styled-components';

interface InputProps {
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

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 80px auto;
  max-width: 80%;
`;

export const Input = styled.input<InputProps>`
  padding: 15px;
  border-radius: 10px;
  border: 0;
  outline: none;
  font-family: 'Poppins', sans-serif;
  color: ${props => props.theme.colors.text_primary};
  background: ${props => props.theme.colors.surface};

  box-shadow: 0px 0px 5px 1px
    ${props =>
      props.isFocused ? props.theme.colors.primary : props.theme.colors.border};

  & + input {
    margin-top: 20px;
  }

  & + input {
    margin-top: 20px;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 10px;
  border: 0;
  margin-top: 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;

  transition: scale 0.2s linear;

  &:active {
    transform: scale(0.99);
  }

  cursor: pointer;

  > svg {
    margin-right: 8px;
  }

  color: #fff;

  background: ${props => props.theme.colors.primary};
`;
