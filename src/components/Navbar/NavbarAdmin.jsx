/* eslint-disable react/prop-types */
import { Container, Navbar, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './../../assets/logo.png';
import { ConnectionStatusIndicator } from './ConnectionStatusIndicator';
import { OrderCountIndicator } from './OrderCountIndicator';
import { usePreferences } from './../../Context/PreferencesContext';
import { useAuth } from './../../Context/AuthContext';
import { ADMIN_ROUTES } from './../../Utils/const/namesRutes'; // Importamos las rutas definidas
import { UserMenu } from './../../Layout/UserMenu';

const NavbarAdmin = () => {
  const { isDarkMode } = usePreferences();
  const { usuarioActual, handleLogout } = useAuth();

  return (
    <Navbar
      expand="lg"
      sticky="top"
      bg={isDarkMode ? 'dark' : 'light'}
      variant={isDarkMode ? 'dark' : 'light'}
      className="shadow-sm"
    >
      <Container fluid >
        <Row className="w-100 align-items-center justify-content-between g-2">
          {/* 1. Logo */}
          <Col xs="auto">
            <Navbar.Brand as={Link} to={ADMIN_ROUTES.path}>
              <img
                src={logo}
                alt="Domiburguer"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </Col>

          {/* 3. Indicador de Conexión */}
          <Col xs="auto">
            <ConnectionStatusIndicator />
          </Col>

          {/* 4. Conteo de Pedidos (solo visible en pantallas medianas en adelante) */}
          <Col xs="auto" className="d-none d-md-block">
            <OrderCountIndicator />
          </Col>

          {/* 5. Toggle del Navbar para móviles */}
          <Col xs="auto" className="d-lg-none text-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Col>
        </Row>

        {/* 6. Menú de Navegación */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Si el usuario está autenticado, mostrar menú de usuario sin flecha */}
          <UserMenu usuarioActual={usuarioActual} onLogout={handleLogout} />

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { NavbarAdmin };
