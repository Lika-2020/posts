import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import myAvatar from '../../img/myAvatar.jpg';

function BurgerMenu() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar className='sm lg md fluid xl xxl'
      style={{
        backgroundColor: '#0955a1bc',
        marginBottom: '100px',
        borderRadius: '36px',
      }}
      expanded={expanded}
      expand={false}
    >
      <Navbar.Toggle
        style={{ marginLeft: '50px' }}
        onClick={handleToggle}
        aria-controls="navbar"
        aria-expanded={expanded}
      >
        <FaBars />
      </Navbar.Toggle>
      <Navbar.Collapse id="navbar">
        <Nav
          className="ml-auto"
          style={{
            paddingLeft: '50px',
            paddingBottom: '10px',
            borderRadius: '36px',
            marginTop: '20px',
          }}
        >
          {expanded && (
            <>
              <div style={{ borderTop: '1px solid white', width: '150px' }}>
                <img
                  style={{ borderRadius: '26px', marginTop: '10px' }}
                  src={myAvatar}
                  width={80}
                  height={100}
                  alt="мой аватар"
                />
                <div
                  style={{ borderBottom: '1px solid white', width: '150px' }}
                >
                  <div>
                    <span style={{ fontSize: '12px', color: 'white' }}>
                      Анжелика Марченкова
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'white' }}>
                      lika-2020@yandex.ru
                    </span>
                  </div>
                </div>
              </div>
              <Nav.Link
                style={{ color: 'white' }}
                href="/"
                onClick={handleToggle}
              >
                List Posts
              </Nav.Link>
              <Nav.Link
                style={{ color: 'white' }}
                href="/about-me"
                onClick={handleToggle}
              >
                About Me
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default BurgerMenu;
