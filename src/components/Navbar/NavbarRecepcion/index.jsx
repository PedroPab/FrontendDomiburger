/* eslint-disable react/prop-types */
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { BsMoonStars, BsTools, BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from './../../../assets/logo.png';
import { useContext } from 'react';
import { RecepcionContexto } from '../../../Context/RecepcionContex';
import { FaMapMarkerAlt, FaRegChartBar, FaCashRegister } from 'react-icons/fa';
import { MdOutlineDeliveryDining, MdOutlineAdminPanelSettings, MdOutlineSettings, MdOutlineReceipt } from "react-icons/md";
import { FiMapPin, FiList } from "react-icons/fi";
import { ReconnectButton } from '../ReconnectButton';
import { ConnectionStatusIndicator } from '../ConnectionStatusIndicator';
import { OrderCountIndicator } from '../OrderCountIndicator';

const NavbarRecepcion = ({ modoOscuro, alternarModo }) => {
  const contextRecepcion = useContext(RecepcionContexto);

  return (
    <Navbar expand="lg" className="sticky-top" bg={modoOscuro ? 'dark' : 'light'}>
      <Container fluid className="m-1">
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}  // Reemplaza con la ruta de tu logo
            alt="Domiburguer"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <ConnectionStatusIndicator />
        <OrderCountIndicator />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* 1. Sección de Crear Pedido */}
            <NavDropdown title={<><MdOutlineReceipt className="me-2" />Crear Pedido</>} id="nav-dropdown-crear-pedido">
              <NavDropdown.Item as={Link} to="/formAdmin">
                <MdOutlineReceipt className="me-2" /> Crear pedido
              </NavDropdown.Item>
              <NavDropdown.Item href="https://domiburguer.com/forAdmin" target="_blank" className='text-muted'>
                <FiList className="me-2" /> Antiguo
              </NavDropdown.Item>
            </NavDropdown>

            {/* 2. Sección de Seguimiento */}
            <NavDropdown title={<><FiMapPin className="me-2" />Seguimiento</>} id="nav-dropdown-seguimiento">
              <NavDropdown.Item as={Link} to="/recepcion">
                <MdOutlineDeliveryDining className="me-2" /> Recepción
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/mapRecepcion">
                <FaMapMarkerAlt className="me-2" /> Mapa
              </NavDropdown.Item>
            </NavDropdown>

            {/* 3. Sección de Administración */}
            <NavDropdown title={<><MdOutlineAdminPanelSettings className="me-2" />Administración</>} id="nav-dropdown-administracion">
              <NavDropdown.Item as={Link} to="/contabilidad">
                <FaCashRegister className="me-2" /> Contabilidad
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/estadisticas">
                <FaRegChartBar className="me-2" /> Estadísticas
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => contextRecepcion.openCloseModalAgregarDo()}>
                <MdOutlineDeliveryDining className="me-2" /> Domiciliarios
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/codigos">
                <FiList className="me-2" /> Códigos
              </NavDropdown.Item>
            </NavDropdown>

            {/* 4. Sección de Ajustes */}
            <NavDropdown title={<><MdOutlineSettings className="me-2" />Ajustes</>} id="nav-dropdown-ajustes">
              <NavDropdown.Item as={Link} to="/login">
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

export { NavbarRecepcion };
