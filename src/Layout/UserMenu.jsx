import { Nav, NavDropdown, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { usePreferences } from "../Context/PreferencesContext";

import photoGeneric from "../assets/img/photoGeneric2.jpg";

const UserMenu = ({ usuarioActual, onLogout }) => {
  const { isDarkMode, toggleTheme } = usePreferences();

  if (!usuarioActual) return (
    <Nav className="d-flex">
      <Nav.Link as={Link} to="/login">
        <Button variant="primary" className="px-4">Iniciar Sesión</Button>
      </Nav.Link>
    </Nav>
  )

  return (
    <Nav className="d-flex">
      <NavDropdown
        bsPrefix="nav-link"
        title={
          <div className="d-flex align-items-center user-profile">
            <Image
              src={usuarioActual.photoURL || photoGeneric}
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
        <NavDropdown.Item onClick={onLogout} className="text-danger">
          <FaSignOutAlt className="me-2" /> Cerrar Sesión
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export { UserMenu };
