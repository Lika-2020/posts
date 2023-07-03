import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import AppRoutes from './routes/routes';

function App() {
  return (
    <Container className='sm lg md fluid xl xxl center'>
      <AppRoutes />
    </Container>
  );
}

export default App;
