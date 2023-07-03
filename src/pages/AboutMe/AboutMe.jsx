import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';
import myAvatar from '../../img/myAvatar.jpg';

function AboutMe() {
  return (
    <Container className="my-4">
      <Row  className='mt-4' >
      <BurgerMenu />
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={4} className="text-center">
          <img className='mt-4' src={myAvatar} alt="аватар" width={220} height={300} />
        </Col>
        <Col xs={12} md={8}>
          <h3 className='text-center mt-4'>Анжелика Марченкова</h3>
          <title>Фронтенд-разработчик</title>
          <Card style={{border: 'none'}}>
            <Card.Body>
              Я фронтенд-разработчик с глубоким пониманием современных веб-технологий. У меня есть навыки в HTML,
              CSS и JavaScript, а также владение популярными фреймворками, такими как React и сопутствующие
              библиотеки. Я обладаю отличным вкусом в дизайне и стараюсь создавать красивые и интуитивно
              понятные пользовательские интерфейсы. Мои работы отличаются высокой производительностью,
              совместимостью с различными браузерами и отзывчивым дизайном. Я коммуникабельна, организована и
              способна эффективно работать в команде. В поиске новых вызовов и возможностей для развития
              профессиональных навыков в области фронтенд-разработки.
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutMe;

