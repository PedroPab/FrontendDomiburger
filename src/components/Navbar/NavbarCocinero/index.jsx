/* eslint-disable react/prop-types */
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { BsMoonStars } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from './../../../assets/logo.png';
import { BiLogIn } from "react-icons/bi"
import { FaHome, FaMapMarkedAlt } from 'react-icons/fa';
import { ConnectionStatusIndicator } from '../ConnectionStatusIndicator';
import { OrderCountIndicator } from '../OrderCountIndicator';

const NavbarCocinero = ({ modoOscuro, alternarModo }) => {
  return (
    <Navbar expand="lg" className='sticky-top' bg={modoOscuro ? 'dark' : 'light'} >
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

            <Nav.Link as={Link} to="/cocina">  <FaHome /> Home</Nav.Link>

            <Nav.Link as={Link} to="/mapCocina">  <FaMapMarkedAlt /> Map</Nav.Link>
            <Nav.Link as={Link} to="/login">  <BiLogIn /> Login</Nav.Link>


            {/* <Nav.Link as={Link} to="/historial">  <FaHistory /> Historial</Nav.Link> */}


            <Nav.Item>
              <Button variant={modoOscuro ? 'outline-light' : 'outline-dark'} onClick={() => (alternarModo())}>
                <BsMoonStars />
              </Button>
            </Nav.Item>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { NavbarCocinero };
