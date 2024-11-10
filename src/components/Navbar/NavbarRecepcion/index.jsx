/* eslint-disable react/prop-types */
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { BsMoonStars } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from './../../../assets/logo.png';
import { BiAccessibility, BiArrowFromBottom, BiHappy, BiLogIn, BiMobile, BiTone } from "react-icons/bi";
import { RecepcionContexto } from '../../../Context/RecepcionContex';
import { useContext } from 'react';
import { FaAngellist, FaMapMarkedAlt } from 'react-icons/fa';
import { ReconnectButton } from '../ReconnectButton';
import { ConnectionStatusIndicator } from '../ConnectionStatusIndicator';
import { OrderCountIndicator } from '../OrderCountIndicator';

const NavbarRecepcion = ({ modoOscuro, alternarModo }) => {
  const contextRecepcion = useContext(RecepcionContexto);

  return (
    <Navbar expand="lg" className='sticky-top' bg={modoOscuro ? 'dark' : 'light'}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}  // Reemplaza con la ruta de tu logo
            alt="Logo"
            height="30"
            className="d-inline-block align-top"
          />
          Domiburguer
        </Navbar.Brand>

        <ConnectionStatusIndicator />
        <OrderCountIndicator />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://domiburguer.com/forAdmin" target="_blank"> <BiHappy /> Crear pedido</Nav.Link>
            <Nav.Link as={Link} to="/formAdmin">  <BiTone /> Nuevo FormAdmin</Nav.Link>
            <Nav.Link as={Link} to="/recepcion">  <FaAngellist /> Domi Rastreo</Nav.Link>
            <Nav.Link as={Link} to="/mapRecepcion">  <FaMapMarkedAlt /> Map</Nav.Link>
            <Nav.Link as={Link} to="/login">  <BiLogIn /> Login</Nav.Link>
            <Nav.Link as={Link} to="/contabilidad">  <BiArrowFromBottom /> Contabilidad</Nav.Link>
            <Nav.Link as={Link} to="/estadisticas"> Estadísticas</Nav.Link>
            <Nav.Link as={Link} to="/codigos">  <BiAccessibility /> Codigos</Nav.Link>
            <Nav.Link onClick={() => { contextRecepcion.openCloseModalAgregarDo() }}>  <BiMobile /> Domiciliarios</Nav.Link>
          </Nav>
          <Button variant={modoOscuro ? 'outline-light' : 'outline-dark'} onClick={() => alternarModo()}>
            <BsMoonStars />
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { NavbarRecepcion };
