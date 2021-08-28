import React, { FormEvent, useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiFilePlus, FiMenu } from 'react-icons/fi';

import SideMenu from '../../components/SideMenu';
import { usePackages } from '../../hooks/packages';
import { useTheme } from '../../hooks/theme';

import {
  Container,
  Header,
  Content,
  MenuToggleButton,
  Form,
  Input,
  SubmitButton,
} from './styles';

interface SideMenuRef {
  toggleMenu(): void;
}

const New: React.FC = () => {
  const { theme } = useTheme();
  const history = useHistory();

  const { create } = usePackages();

  const [nameFocused, setNameFocused] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const sideMenuRef = useRef<SideMenuRef>(null);

  const toggleMenu = useCallback(() => {
    sideMenuRef.current?.toggleMenu();
  }, []);

  const submitHandle = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (name.length > 0 && code.length > 0) {
        create({ title: name, code });
        history.push('/');
      } else {
        alert('Preencha todos os campos');
      }
    },
    [name, code, create, history],
  );

  return (
    <Container>
      <SideMenu ref={sideMenuRef} />
      <Content>
        <Header>
          <MenuToggleButton onClick={toggleMenu}>
            <FiMenu size={24} color={theme.colors.text_primary} />
          </MenuToggleButton>
        </Header>

        <Form onSubmit={submitHandle}>
          <Input
            name="name"
            value={name}
            isFocused={nameFocused}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            onChange={e => setName(e.target.value)}
            placeholder="Nome"
          />
          <Input
            name="code"
            value={code}
            isFocused={codeFocused}
            onFocus={() => setCodeFocused(true)}
            onBlur={() => setCodeFocused(false)}
            onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="Código de rastreio"
          />
          <SubmitButton>
            <FiFilePlus />
            Adicionar
          </SubmitButton>
        </Form>
      </Content>
    </Container>
  );
};

export default New;
