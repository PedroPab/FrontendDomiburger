import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs'; // Ejemplo de icono
import { usePreferences } from '../../Context/PreferencesContext'; // Importa el hook de preferencias
import logo from './../../assets/logo.png';
import ThemeToggle from '../ThemeToggle';

const UserNavbar = () => {
  const { isDarkMode, toggleTheme } = usePreferences(); // Obtener estado y función del contexto de preferencias

  return (
    <Navbar bg={isDarkMode ? 'dark' : 'light'} expand="lg" sticky="top" variant={isDarkMode ? 'dark' : 'light'}>
      <Container fluid>
        {/* Logo de la barra de navegación */}
        <Navbar.Brand as={Link} to="/me">
          <img
            src={logo}
            alt="Domiburguer"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Botón de navegación móvil */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Enlaces de navegación */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="mx-2">
              Pedir ahora
            </Nav.Link>

            <Nav.Link as={Link} to="/services" className="mx-2">
              Ubicaciones
            </Nav.Link>

            {/* Menú desplegable */}
            {/* <NavDropdown title="Dropdown" id="navbar-dropdown" className="mx-2">
              <NavDropdown.Item as={Link} to="/option1">
                Option 1
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/option2">
                Option 2
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/option3">
                Option 3
              </NavDropdown.Item>
            </NavDropdown> */}

            {/* Botón de usuario (ejemplo con icono) */}
            <Nav.Link as={Link} to="/me" className="mx-2">
              <BsFillPersonFill size={20} /> Perfil
            </Nav.Link>

            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />


            {/* Botón de acción */}
            <Nav.Link href="login" className="mx-2">
              <Button variant="outline-primary">Sign Up</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { UserNavbar };
