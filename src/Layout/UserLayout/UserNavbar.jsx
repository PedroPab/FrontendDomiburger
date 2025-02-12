import { Navbar, Nav, Container, NavDropdown, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usePreferences } from "../../Context/PreferencesContext";
import { useAuth } from "../../Context/AuthContext";
import { FirebaseAuth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import logo from "./../../assets/logo.png";
import ThemeToggle from "../ThemeToggle";
import { FaSignOutAlt, FaUserCircle, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import "./UserNavbar.css";
import { LOGIN_ROUTES, USER_ROUTES } from "../../Utils/const/namesRutes";

const UserNavbar = () => {
  const { isDarkMode, toggleTheme } = usePreferences();
  const { usuarioActual } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(FirebaseAuth);
      console.log("Sesión cerrada con éxito");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
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
        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={logo} alt="Domiburguer" height="40" className="me-2" />
        </Navbar.Brand>

        {/* TOGGLE (Para móviles) */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          {/* SECCIÓN DE NAVEGACIÓN */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="d-flex align-items-center gap-2">
              <FaShoppingCart /> Pedir ahora
            </Nav.Link>

            <Nav.Link as={Link} to={USER_ROUTES.routes.LOCATIONS} className="d-flex align-items-center gap-2">
              <FaMapMarkerAlt /> Ubicaciones
            </Nav.Link>

            <Nav.Link as={Link} to={USER_ROUTES.routes.CREATE_ORDER} className="d-flex align-items-center gap-2">
              <FaShoppingCart /> Pedir Ya Nuevo
            </Nav.Link>
          </Nav>

          {/* SECCIÓN DE USUARIO */}
          <Nav className="d-flex align-items-center">
            {/* Botón para cambiar tema */}
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

            {/* Si el usuario está autenticado, mostrar menú de usuario sin flecha */}
            {usuarioActual ? (
              <NavDropdown
                bsPrefix="nav-link" // Elimina el estilo de dropdown por defecto
                title={
                  <div className="d-flex align-items-center user-profile">
                    <Image
                      src={usuarioActual.photoURL || "https://via.placeholder.com/40"}
                      roundedCircle
                      width="40"
                      height="40"
                      className="me-2 user-avatar"
                    />
                    <span className="user-name">{usuarioActual.displayName || "Usuario"}</span>
                  </div>
                }
                id="user-dropdown"
                align="end"
                className="user-menu"
              >
                <NavDropdown.Item as={Link} to="/me">
                  <FaUserCircle className="me-2" /> Perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  <FaSignOutAlt className="me-2" /> Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to={LOGIN_ROUTES.routes.LOGIN_AUTH}>
                <Button variant="primary" className="px-4">Iniciar Sesión</Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
};

export { UserNavbar };
