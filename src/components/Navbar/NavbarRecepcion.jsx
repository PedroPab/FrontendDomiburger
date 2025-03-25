import { Container, Navbar, Nav, NavDropdown, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './../../assets/logo.png';
import { useRecepcion } from '../../Context/RecepcionContex';
import { usePreferences } from '../../Context/PreferencesContext';
import { useAuth } from '../../Context/AuthContext';
import { ConnectionStatusIndicator } from './ConnectionStatusIndicator';
import { OrderCountIndicator } from './OrderCountIndicator';
import { UserMenu } from '../../Layout/UserMenu';
import { KitchenSelector } from './KitchenSelector';
import {
	CODIGO_ROUTES,
	ESTADISTICAS_ROUTES,
	RECEPCION_ROUTES
} from '../../Utils/const/namesRutes';
import { BsFillPersonFill, BsPeopleFill } from 'react-icons/bs';
import { FaMapMarkerAlt, FaRegChartBar, FaCashRegister } from 'react-icons/fa';
import { MdOutlineDeliveryDining, MdOutlineAdminPanelSettings, MdOutlineReceipt } from 'react-icons/md';
import { FiMapPin, FiList } from 'react-icons/fi';

const NavbarRecepcion = () => {
	const { toggleSidebar, openCloseModalAgregarDo } = useRecepcion();
	const { isDarkMode } = usePreferences();
	const { usuarioActual, handleLogout } = useAuth();

	// Configuración de los elementos del menú
	const crearPedidoItems = [
		{
			title: 'Crear pedido',
			icon: <MdOutlineReceipt className="me-1" size={18} />,
			route: RECEPCION_ROUTES.routes.FORM_ADMIN_V2,
		},
	];

	const seguimientoItems = [
		{
			title: 'Recepción',
			icon: <MdOutlineDeliveryDining className="me-1" size={18} />,
			route: RECEPCION_ROUTES.path,
		},
		{
			title: 'Mapa',
			icon: <FaMapMarkerAlt className="me-1" size={18} />,
			route: RECEPCION_ROUTES.routes.MAP_RECEPCION,
		},
	];

	const administracionItems = [
		{
			title: 'Contabilidad',
			icon: <FaCashRegister className="me-1" size={18} />,
			route: RECEPCION_ROUTES.routes.CONTABILIDAD,
		},
		{
			title: 'Estadísticas',
			icon: <FaRegChartBar className="me-1" size={18} />,
			route: ESTADISTICAS_ROUTES.path,
		},
		{
			title: 'Domiciliarios',
			icon: <MdOutlineDeliveryDining className="me-1" size={18} />,
			onClick: openCloseModalAgregarDo,
		},
		{
			title: 'Códigos',
			icon: <FiList className="me-1" size={18} />,
			route: CODIGO_ROUTES.path,
		},
		{
			title: 'Clientes',
			icon: <BsFillPersonFill className="me-1" size={18} />,
			route: RECEPCION_ROUTES.routes.CLIENTES,
		},
		{
			title: 'Pedidos',
			icon: <MdOutlineReceipt className="me-1" size={18} />,
			route: RECEPCION_ROUTES.routes.PEDIDOS,
		},
	];

	return (
		<Navbar
			expand="lg"
			sticky="top"
			bg={isDarkMode ? 'dark' : 'light'}
			variant={isDarkMode ? 'dark' : 'light'}
			className="shadow-sm"
		>
			<Container fluid>
				<Row className="w-100 align-items-center justify-content-between g-2">
					{/* Logo */}
					<Col xs="auto">
						<Navbar.Brand as={Link} to={RECEPCION_ROUTES.path}>
							<img src={logo} alt="Domiburguer" height="30" className="d-inline-block align-top" />
						</Navbar.Brand>
					</Col>

					{/* Botón para alternar el filtro de domiciliarios */}
					<Col xs="auto">
						<Button
							variant="link"
							onClick={toggleSidebar}
							className="p-2 text-primary d-flex align-items-center"
							style={{ boxShadow: 'none', border: 'none' }}
						>
							<BsPeopleFill size={20} className="me-1" />
						</Button>
					</Col>

					{/* Indicador de Conexión */}
					<Col xs="auto">
						<ConnectionStatusIndicator />
					</Col>

					{/* Conteo de Pedidos (visible en pantallas medianas en adelante) */}
					<Col xs="auto" className="d-none d-md-block">
						<OrderCountIndicator />
					</Col>

					{/* cambiar y mostar la cocina  */}
					<Col xs="auto">
						<KitchenSelector />
					</Col>

					{/* Toggle para móviles */}
					<Col xs="auto" className="d-lg-none text-end">
						<Navbar.Toggle aria-controls="navbar-nav" />
					</Col>
				</Row>

				<Navbar.Collapse id="navbar-nav">
					<Nav className="ms-auto align-items-center">
						{/* Sección: Crear Pedido */}
						{crearPedidoItems.map((item, idx) => (
							<NavDropdown.Item key={idx} as={Link} to={item.route} className="mx-2">
								{item.icon}
								{item.title}
							</NavDropdown.Item>
						))}

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
							{seguimientoItems.map((item, idx) => (
								<NavDropdown.Item key={idx} as={Link} to={item.route}>
									{item.icon}
									{item.title}
								</NavDropdown.Item>
							))}
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
							{administracionItems.map((item, idx) => (
								<NavDropdown.Item
									key={idx}
									as={item.route ? Link : 'button'}
									to={item.route || undefined}
									onClick={item.onClick ? item.onClick : undefined}
									className="w-100 text-start border-0 bg-transparent"
								>
									{item.icon}
									{item.title}
								</NavDropdown.Item>
							))}
						</NavDropdown>

					</Nav>

					{/* Menú de usuario */}
					<UserMenu usuarioActual={usuarioActual} onLogout={handleLogout} />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export { NavbarRecepcion };
