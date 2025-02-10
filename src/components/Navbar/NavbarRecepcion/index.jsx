/* eslint-disable react/prop-types */
import { Container, Navbar, Nav, NavDropdown, Col, Row, Button } from 'react-bootstrap';
import { BsMoonStars, BsTools, BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from './../../../assets/logo.png';
import { useContext } from 'react';
import { ContextProviderRecepcion, RecepcionContexto } from '../../../Context/RecepcionContex';
import { FaMapMarkerAlt, FaRegChartBar, FaCashRegister } from 'react-icons/fa';
import { MdOutlineDeliveryDining, MdOutlineAdminPanelSettings, MdOutlineSettings, MdOutlineReceipt } from 'react-icons/md';
import { FiMapPin, FiList } from 'react-icons/fi';
import { ConnectionStatusIndicator } from '../ConnectionStatusIndicator';
import { OrderCountIndicator } from '../OrderCountIndicator';
import { PreferencesContext } from '../../../Context/PreferencesContext';

const NavbarRecepcionCom = () => {
  const contextRecepcion = useContext(RecepcionContexto);
  const { toggleSidebar } = contextRecepcion;
  const { isDarkMode, toggleTheme } = useContext(PreferencesContext)

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
          <Col xs="auto">
            <Button variant="outline-primary" onClick={() => toggleSidebar()}>
              <BsTools size={20} /> hol
            </Button>
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
          <Nav className="ms-auto align-items-center">
            {/* Sección: Crear Pedido */}
            <NavDropdown.Item as={Link} to="/formAdmin" className="mx-2">
              <MdOutlineReceipt className="me-1" size={18} /> Crear pedido
            </NavDropdown.Item>

            {/* Sección: Seguimiento */}
            <NavDropdown
              title={
                <span>
                  <FiMapPin className="me-1" size={18} /> Seguimiento
                </span>
              }
              id="nav-dropdown-seguimiento"
              className="mx-2"
            >
              <NavDropdown.Item as={Link} to="/recepcion">
                <MdOutlineDeliveryDining className="me-1" size={18} /> Recepción
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/mapRecepcion">
                <FaMapMarkerAlt className="me-1" size={18} /> Mapa
              </NavDropdown.Item>
            </NavDropdown>

            {/* Sección: Administración */}
            <NavDropdown
              title={
                <span>
                  <MdOutlineAdminPanelSettings className="me-1" size={18} /> Administración
                </span>
              }
              id="nav-dropdown-administracion"
              className="mx-2"
            >
              <NavDropdown.Item as={Link} to="/contabilidad">
                <FaCashRegister className="me-1" size={18} /> Contabilidad
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/estadisticas">
                <FaRegChartBar className="me-1" size={18} /> Estadísticas
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => contextRecepcion.openCloseModalAgregarDo()}>
                <MdOutlineDeliveryDining className="me-1" size={18} /> Domiciliarios
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/codigos">
                <FiList className="me-1" size={18} /> Códigos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/clientes">
                <BsFillPersonFill className="me-1" size={18} /> Clientes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/pedidos">
                <MdOutlineReceipt className="me-1" size={18} /> Pedidos
              </NavDropdown.Item>
            </NavDropdown>

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
              <NavDropdown.Item as={Link} to="/login">
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

const NavbarRecepcion = (props) => {

  return (
    <  >
      <NavbarRecepcionCom  {...props} />
    </ >
  )
}

export { NavbarRecepcion };
