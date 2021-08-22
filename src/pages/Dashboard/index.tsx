import { useTheme } from '../../hooks/theme';
import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return <Container></Container>;
};

export default Dashboard;
