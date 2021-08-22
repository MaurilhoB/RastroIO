import { Container, Menu, MenuItem } from './styles';
import { FiPackage, FiArchive, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../hooks/theme';

const SideMenu: React.FC = () => {
  const { toggleTheme } = useTheme();
  return (
    <Container>
      <Menu>
        <MenuItem bgcolor="#f1ac38">
          <FiPackage size={26} color="#fff" />
        </MenuItem>

        <MenuItem bgcolor="#3097ef">
          <FiArchive size={24} color="#fff" />
        </MenuItem>

        <MenuItem onClick={toggleTheme} bgcolor="#4c5097">
          <FiMoon size={24} color="#fff" />
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default SideMenu;
