 
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { BsMoonStars } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from './../../../assets/logo.png';
import { FaHome, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import { usePreferences } from '../../../Context/PreferencesContext';
import { LOGIN_ROUTES } from '../../../Utils/const/namesRutes';
// import { MiContexto } from '../../../Context';
// import { useAuth } from '../../../Context/AuthContext';

const NavbarCliente = () => {
  const { isDarkMode, toggleTheme } = usePreferences(); // Obtener estado y función del contexto de preferencias

  // const { usuarioActual } = useAuth();
  const usuario = false

  return (
    <Navbar
      expand="lg"
      bg={isDarkMode ? 'dark' : 'light'}
      variant={isDarkMode ? 'dark' : 'light'}
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
          <Nav className="ms-auto">
            {/* Inicio */}
            <Nav.Link
              as={Link}
              to="/"
              aria-label="Ir a la página de inicio"
              className="text-decoration-none"
            >
              <FaHome className="me-1" aria-hidden="true" /> Inicio
            </Nav.Link>

            {/* Mi Pedido */}
            <Nav.Link
              as={Link}
              to="/mi-pedido"
              aria-label="Ir a la página de mi pedido"
              className="text-decoration-none"
            >
              <FaShoppingCart className="me-1" aria-hidden="true" /> Mi Pedido
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

            {/* Botón para Cambiar Tema */}
            <Nav.Item>
              <Button
                variant={isDarkMode ? 'outline-light' : 'outline-dark'}
                onClick={toggleTheme}
                className="mt-2 mt-lg-0"
                aria-label={`Activar ${isDarkMode ? 'tema claro' : 'tema oscuro'}`}
              >
                <BsMoonStars aria-hidden="true" />
              </Button>
            </Nav.Item>

            {/* Perfil del Usuario */}
            {usuario ? (
              <Nav.Link
                as={Link}
                to="/me"
                className="d-flex align-items-center ms-3"
                aria-label="Ir a tu perfil"
              >
                <img
                  src={usuario.photoURL || 'https://via.placeholder.com/30'}
                  alt="Foto de perfil"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                  className="me-2"
                />
                {/* Se muestra el nombre solo en pantallas grandes; en móviles se puede prescindir */}
                <span className="d-none d-lg-inline">
                  {usuario.displayName || usuario.email}
                </span>
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to={LOGIN_ROUTES.routes.LOGIN_AUTH}
                className="text-decoration-none ms-3"
                aria-label="Iniciar sesión"
              >
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { NavbarCliente };
