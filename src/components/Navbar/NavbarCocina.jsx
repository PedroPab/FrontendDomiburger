/* eslint-disable react/prop-types */
import { Container, Navbar, Nav, NavDropdown, Col, Row } from 'react-bootstrap';
import { BsMoonStars, BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from './../../assets/logo.png';
import { useContext } from 'react';
import { ConnectionStatusIndicator } from './ConnectionStatusIndicator';
import { OrderCountIndicator } from './OrderCountIndicator';
import { PreferencesContext } from '../../Context/PreferencesContext';
import { MdOutlineSettings } from 'react-icons/md';
import { LOGIN_ROUTES } from '../../Utils/const/namesRutes';


const NavbarCocina = () => {
  const { isDarkMode, toggleTheme } = useContext(PreferencesContext);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      bg={isDarkMode ? 'dark' : 'light'}
      variant={isDarkMode ? 'dark' : 'light'}
      className="shadow-sm"
    >
      <Container fluid className="px-3 py-2">
        <Row className="w-100 align-items-center justify-content-between g-2">
          {/* 1. Logo */}
          <Col xs="auto">
            <Navbar.Brand as={Link} to="/">
              <img
                src={logo}
                alt="Domiburguer"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </Col>

          {/* 2. Botón para alternar el filtro de domiciliarios */}

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
          <Nav className="ms-auto align-items-center">

            {/* Sección: Ajustes */}
            <NavDropdown
              title={
                <span>
                  <MdOutlineSettings className="me-1" size={18} /> Ajustes
                </span>
              }
              id="nav-dropdown-ajustes"
              className="mx-2"
            >
              <NavDropdown.Item as={Link} to={LOGIN_ROUTES.path}>
                <BsFillPersonFill className="me-1" size={18} /> Login
              </NavDropdown.Item>
              <NavDropdown.Item onClick={toggleTheme}>
                <BsMoonStars className="me-1" size={18} /> Cambiar Tema
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { NavbarCocina };
