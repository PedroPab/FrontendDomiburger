/* eslint-disable react/prop-types */
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { BsMoonStars } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from './../../../assets/logo.png';
import { FaHome, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import { useContext } from 'react';
import { MiContexto } from '../../../Context';

const NavbarCliente = () => {
  const context = useContext(MiContexto);
  const modoOscuro = context.modoOscuro;
  const alternarModo = context.alternarModo;

  return (
    <Navbar
      expand="lg"
      bg={modoOscuro ? 'dark' : 'light'}
      variant={modoOscuro ? 'dark' : 'light'}
      className="sticky-top shadow-sm"
      role="navigation"
      aria-label="Navegación principal"
    >
      <Container>
        {/* Logo y Título */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logotipo de Domiburguer"
            height="30"
            className="d-inline-block align-top"
          />
          <span className="ms-2 fw-bold fs-4" aria-hidden="true">
            Domiburguer
          </span>
        </Navbar.Brand>

        {/* Toggle para móvil */}
        <Navbar.Toggle
          aria-controls="navbar-client-nav"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        />

        {/* Menú de Navegación */}
        <Navbar.Collapse id="navbar-client-nav">
          <Nav className="ms-auto ">
            {/* Inicio */}
            <Nav.Link
              as={Link}
              to="/"
              aria-label="Ir a la página de inicio"
              className="text-decoration-none"
            >
              <FaHome className="me-1" aria-hidden="true" /> Inicio
            </Nav.Link>

            {/* mi pedido */}
            <Nav.Link
              as={Link}
              to="/mi-pedido"
              aria-label="Ir a la página de mi pedido"
              className="text-decoration-none"
            >
              <FaShoppingCart className="me-1" aria-hidden="true" />  Mi Pedido

            </Nav.Link>
            {/* Nosotros */}
            <Nav.Link
              as={Link}
              to="/nosotros"
              aria-label="Conocer más sobre nosotros"
              className="text-decoration-none"
            >
              <FaInfoCircle className="me-1" aria-hidden="true" /> Nosotros
            </Nav.Link>
            {/* Botón Cambiar Tema */}
            <Nav.Item>
              <Button
                variant={modoOscuro ? 'outline-light' : 'outline-dark'}
                onClick={alternarModo}
                className="mt-2 mt-lg-0"
                aria-label={`Activar ${modoOscuro ? 'tema claro' : 'tema oscuro'}`}
              >
                <BsMoonStars aria-hidden="true" />
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { NavbarCliente };
