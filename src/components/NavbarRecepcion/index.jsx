/* eslint-disable react/prop-types */
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { BsMoonStars } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from './../../assets/logo.png';
import { BiLogIn } from "react-icons/bi"

const NavBar = ({ modoOscuro, alternarModo }) => {
  return (
    <Navbar expand="lg" className='sticky-top'  >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}  // Reemplaza con la ruta de tu logo
            alt="Logo"
            height="30"
            className="d-inline-block align-top"
          />
          Domiburguer
        </Navbar.Brand>        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login">  <BiLogIn /> Login</Nav.Link>

            <Nav.Link as={Link} to="/pagina2">Página 2</Nav.Link>
          </Nav>
          <Button variant={modoOscuro ? 'outline-light' : 'outline-dark'} onClick={() => (alternarModo())}>
            <BsMoonStars />
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
