import { useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

const MyPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
        <Container>
          <Navbar.Brand href="#home">Mi Aplicación</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#about">Acerca de</Nav.Link>
            <Nav.Link href="#contact">Contacto</Nav.Link>
          </Nav>
          <Button variant={darkMode ? 'light' : 'dark'} onClick={toggleTheme}>
            Cambiar Tema
          </Button>
        </Container>
      </Navbar>
      hola



      <Container className="mt-4">
        <h1>Bienvenido a Mi Aplicación</h1>

        <div className="row">
          {/* ... Contenido de las columnas ... */}
        </div>
      </Container>
    </>
  );
};

export default MyPage;
