/* eslint-disable react/prop-types */
import { Container, Navbar, Nav, NavDropdown, Col, Row, Button, Dropdown, Image } from 'react-bootstrap';
import { BsMoonStars, BsFillPersonFill, BsPeopleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from './../../../assets/logo.png';
import { useRecepcion } from '../../../Context/RecepcionContex';
import { FaMapMarkerAlt, FaRegChartBar, FaCashRegister, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineDeliveryDining, MdOutlineAdminPanelSettings, MdOutlineSettings, MdOutlineReceipt } from 'react-icons/md';
import { FiMapPin, FiList } from 'react-icons/fi';
import { ConnectionStatusIndicator } from '../ConnectionStatusIndicator';
import { OrderCountIndicator } from '../OrderCountIndicator';
import { usePreferences } from '../../../Context/PreferencesContext';
import { useAuth } from '../../../Context/AuthContext';
import { CODIGO_ROUTES, ESTADISTICAS_ROUTES, LOGIN_ROUTES, RECEPCION_ROUTES } from '../../../Utils/const/namesRutes'; // Importamos las rutas definidas
import ThemeToggle from '../../../Layout/ThemeToggle';

const NavbarRecepcion = () => {
  const { toggleSidebar, openCloseModalAgregarDo } = useRecepcion()
  const { isDarkMode, toggleTheme, roleSelect, setRoleSelect } = usePreferences();
  const { usuarioActual, handleLogout } = useAuth();
  const rolesOptions = usuarioActual?.roles || [];

  return (
    <Navbar
      expand="lg"
      sticky="top"
      bg={isDarkMode ? 'dark' : 'light'}
      variant={isDarkMode ? 'dark' : 'light'}
      className="shadow-sm"
    >
      <Container fluid >
        <Row className="w-100 align-items-center justify-content-between g-2">
          {/* 1. Logo */}
          <Col xs="auto">
            <Navbar.Brand as={Link} to={RECEPCION_ROUTES.path}>
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
            <Button
              variant="link"
              onClick={() => toggleSidebar()}
              className="p-2 text-primary d-flex align-items-center"
              style={{ boxShadow: 'none', border: 'none' }}
            >
              <BsPeopleFill size={20} className="me-1" />
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
            <NavDropdown.Item as={Link} to={RECEPCION_ROUTES.routes.FORM_ADMIN} className="mx-2">
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
              <NavDropdown.Item as={Link} to={RECEPCION_ROUTES.path}>
                <MdOutlineDeliveryDining className="me-1" size={18} /> Recepción
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={RECEPCION_ROUTES.routes.MAP_RECEPCION}>
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
              <NavDropdown.Item as={Link} to={RECEPCION_ROUTES.routes.CONTABILIDAD}>
                <FaCashRegister className="me-1" size={18} /> Contabilidad
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={ESTADISTICAS_ROUTES.path}>
                <FaRegChartBar className="me-1" size={18} /> Estadísticas
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => openCloseModalAgregarDo()}>
                <MdOutlineDeliveryDining className="me-1" size={18} /> Domiciliarios
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={CODIGO_ROUTES.path}>
                <FiList className="me-1" size={18} /> Códigos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={RECEPCION_ROUTES.routes.CLIENTES}>
                <BsFillPersonFill className="me-1" size={18} /> Clientes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={RECEPCION_ROUTES.routes.PEDIDOS}>
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
              <NavDropdown.Item as={Link} to={LOGIN_ROUTES.path}>
                <BsFillPersonFill className="me-1" size={18} /> Login
              </NavDropdown.Item>
              <NavDropdown.Item onClick={toggleTheme}>
                <BsMoonStars className="me-1" size={18} /> Cambiar Tema
              </NavDropdown.Item>
            </NavDropdown>

            {/* Sección: Selección de Rol */}
            <NavDropdown
              title={
                <span>
                  <FiList className="me-1" size={18} /> Rol: {roleSelect}
                </span>
              }
              id="nav-dropdown-rol"
              className="mx-2"
            >
              {rolesOptions.map((role, index) => (
                <NavDropdown.Item
                  key={index}
                  onClick={() => setRoleSelect(role)}
                  className={roleSelect === role ? 'text-primary fw-bold' : ''}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>

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
    </Navbar>
  );
};

export { NavbarRecepcion };
