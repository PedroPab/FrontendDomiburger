/* eslint-disable react/prop-types */
import { Container, Navbar, Nav, NavDropdown, Col, Row } from 'react-bootstrap';
import { BsFillPersonFill, BsMoonStars } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from './../../../assets/logo.png';
import { FaHome, FaHistory } from "react-icons/fa";
import { ConnectionStatusIndicator } from '../ConnectionStatusIndicator';
import { OrderCountIndicator } from '../OrderCountIndicator';
import { MdOutlineSettings } from 'react-icons/md';
import { LOGIN_ROUTES } from '../../../Utils/const/namesRutes';

const NavbarDomiciliario = ({ modoOscuro, alternarModo }) => {

  return (
    <Navbar expand="lg" className="sticky-top" bg={modoOscuro ? 'dark' : 'light'}>
      <Container fluid className="m-1">
        <Row className="w-100 align-items-center justify-content-between">
          {/* 1. Logo */}
          <Col xs="auto">
            <Navbar.Brand as={Link} to="/">
              <img
                src={logo}  // Reemplaza con la ruta de tu logo
                alt="Domiburguer"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </Col>

          {/* 2. Indicador de Conexión */}
          <Col xs="auto">
            <ConnectionStatusIndicator />
          </Col>

          {/* 3. Conteo de Pedidos (solo visible en pantallas medianas y grandes) */}
          <Col xs="auto" >
            <OrderCountIndicator />
          </Col>

          {/* 4. Navbar Toggle */}
          <Col xs="auto" className="text-end d-lg-none">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Col>
        </Row>

        {/* 5. Navbar Collapse (Menú de Navegación) */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Enlaces del Menú */}
            <Nav.Link as={Link} to="/domiciliario">
              <FaHome className="me-2" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/domiciliario/history">
              <FaHistory className="me-2" /> Mis pedidos
            </Nav.Link>



            {/* Sección de Ajustes */}
            <NavDropdown title={<><MdOutlineSettings className="me-2" />Ajustes</>} id="nav-dropdown-ajustes">
              <NavDropdown.Item as={Link} to={LOGIN_ROUTES.path}>
                <BsFillPersonFill className="me-2" /> Login
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => alternarModo()}>
                <BsMoonStars className="me-2" /> Cambiar Tema
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { NavbarDomiciliario };
