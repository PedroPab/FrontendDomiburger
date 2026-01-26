import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { usePreferences } from "../../Context/PreferencesContext";
import { useAuth } from "../../Context/AuthContext";
import logo from "./../../assets/logo.png";
import { FaInstagram, FaWhatsapp } from "react-icons/fa"; // Importamos el icono de Instagram
import "./UserNavbar.css";
import { UserMenu } from "../UserMenu";
import ThemeToggle from "../ThemeToggle";
import { useState } from "react";
import { FcCloseUpMode, FcLandscape } from "react-icons/fc"; // Importamos el icono de Instagram

const UserNavbar = () => {
  const { isDarkMode, toggleTheme } = usePreferences();
  const { usuarioActual, handleLogout } = useAuth();
  const [countClick, setCountClick] = useState(0);
  const navigate = useNavigate();
  const handleClick = () => {
    setCountClick(countClick + 1);

    if (countClick >= 8) {
      // alert('¡Has hecho clic más de 5 veces!');
      navigate('/login'); // Redirigir a la página de inicio
      setCountClick(0);
    }
  };
  return (
    <Navbar
      bg={isDarkMode ? "dark" : "light"}
      expand="lg"
      sticky="top"
      variant={isDarkMode ? "dark" : "light"}
      className="shadow-sm"
    >
      <Container fluid>
        {/* LOGO y nombre de la app */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={logo} alt="Domiburguer" height="40" className="me-2" />
          <span className="fw-bold">Domiburguer</span>
        </Navbar.Brand>

        {/* TOGGLE (Para móviles) */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          {/* SECCIÓN DE NAVEGACIÓN */}
          <Nav className="me-auto ">

            <Nav.Link className="d-flex align-items-center gap-2">
              <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </Nav.Link>



            <Nav.Link
              href="https://www.instagram.com/domiburguer_/"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-2 ms-1" // Agregamos margen a la izquierda
            >
              <FaInstagram size={20} />
              <span>@domiburguer_</span>
            </Nav.Link>


            <Nav.Link
              href="https://wa.me/+573506186772?text=holis"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-2 ms-1" // Agregamos margen a la izquierda
            >
              <FaWhatsapp size={20} />
              <span>Nuestro WhatsApp</span>
            </Nav.Link>

            {/* link invisible ( sin nada ) */}
            <Nav.Link
              className="d-flex align-items-center gap-2 ms-1"
              onClick={handleClick}
            >
              <FcLandscape size={20} />
              <FcCloseUpMode size={20} />
              <FcCloseUpMode size={20} />
              <FcCloseUpMode size={20} />
              <FcLandscape size={20} />
            </Nav.Link>

          </Nav>

          {/* SECCIÓN DE USUARIO */}
          {
            usuarioActual && (
              <UserMenu usuarioActual={usuarioActual} onLogout={handleLogout} />
            )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { UserNavbar };
