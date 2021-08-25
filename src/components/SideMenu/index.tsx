import { Container, Menu, MenuItem } from './styles';
import { FiPackage, FiArchive, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../hooks/theme';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { config, useTransition } from '@react-spring/web';
import { Link } from 'react-router-dom';

interface SideMenuRef {
  toggleMenu(): void;
}

const SideMenu: React.ForwardRefRenderFunction<SideMenuRef> = (props, ref) => {
  const { toggleTheme, theme } = useTheme();

  const [menuOpened, setMenuOpened] = useState(() => {
    const deviceWidth = window.innerWidth;

    if (deviceWidth > 580) {
      return true;
    }
    return false;
  });

  const transition = useTransition(menuOpened, {
    from: { x: '-100%' },
    enter: { x: '0%' },
    leave: { x: '-100%' },
    config: config.gentle,
  });

  useImperativeHandle(ref, () => ({
    toggleMenu() {
      setMenuOpened(prev => !prev);
    },
  }));

  return transition((styles, item) =>
    item ? (
      <Container style={styles}>
        <Menu>
          <Link to="/">
            <MenuItem bgcolor="#f1ac38">
              <FiPackage size={26} color="#fff" />
            </MenuItem>
          </Link>

          <Link to="/archived">
            <MenuItem bgcolor="#3097ef">
              <FiArchive size={24} color="#fff" />
            </MenuItem>
          </Link>

          <MenuItem onClick={toggleTheme} bgcolor="#4c5097">
            {theme.title === 'light' ? (
              <FiMoon size={24} color="#fff" />
            ) : (
              <FiSun size={24} color="#fff" />
            )}
          </MenuItem>
        </Menu>
      </Container>
    ) : null,
  );
};

export default forwardRef(SideMenu);
