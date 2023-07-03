import './_mobile.css';
import Container from 'react-bootstrap/Container';
import Posts from '../../components/Posts/Posts';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';
import './Main.css'

function Main() {
  return (
   
      <Container className="my-4 sm lg md fluid xl xxl">
        <BurgerMenu />
        <Posts />
      </Container>
 
  );
}

export default Main;
