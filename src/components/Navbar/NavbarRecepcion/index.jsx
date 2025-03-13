/* eslint-disable react/prop-types */
import { Container, Navbar, Nav, NavDropdown, Col, Row, Button } from 'react-bootstrap';
import { BsMoonStars, BsFillPersonFill, BsPeopleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from './../../../assets/logo.png';
import { useRecepcion } from '../../../Context/RecepcionContex';
import { FaMapMarkerAlt, FaRegChartBar, FaCashRegister } from 'react-icons/fa';
import { MdOutlineDeliveryDining, MdOutlineAdminPanelSettings, MdOutlineSettings, MdOutlineReceipt } from 'react-icons/md';
import { FiMapPin, FiList } from 'react-icons/fi';
import { ConnectionStatusIndicator } from '../ConnectionStatusIndicator';
import { OrderCountIndicator } from '../OrderCountIndicator';
import { usePreferences } from '../../../Context/PreferencesContext';
import { useAuth } from '../../../Context/AuthContext';
import { CODIGO_ROUTES, ESTADISTICAS_ROUTES, LOGIN_ROUTES, RECEPCION_ROUTES } from '../../../Utils/const/namesRutes'; // Importamos las rutas definidas
import { UserMenu } from '../../../Layout/UserMenu';
import { useState } from 'react';
import { useMiContexto } from '../../../Context';
import { useWorker } from '../../../Context/WorkerContext';

const NavbarRecepcion = () => {
	const { toggleSidebar, openCloseModalAgregarDo } = useRecepcion()
	const { isDarkMode, toggleTheme } = usePreferences();
	const { usuarioActual, handleLogout } = useAuth();
	//cambiar la cocina asignada
	const { changeKitchen, kitchenSelectId } = useMiContexto();
	const { userData } = useAuth();
	console.log("🚀 ~ NavbarRecepcion ~ userData:", userData)
	const [showKitchens, setShowKitchens] = useState(false);

	const { listKitchens } = useWorker()

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

				{/* 7. Menú de Navegación */}
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">
						{/* Sección: Crear Pedido */}
						<NavDropdown.Item as={Link} to={RECEPCION_ROUTES.routes.FORM_ADMIN} className="mx-2">
							<MdOutlineReceipt className="me-1" size={18} /> Crear pedido
						</NavDropdown.Item>

						<NavDropdown.Item as={Link} to={RECEPCION_ROUTES.routes.FORM_ADMIN_V2} className="mx-2">
							<MdOutlineReceipt className="me-1" size={18} /> Crear pedido versión 2
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
					</Nav>

					{/* Si el usuario está autenticado, mostrar menú de usuario sin flecha */}
					<UserMenu usuarioActual={usuarioActual} onLogout={handleLogout} />

					<Col xs="auto">
						<Button
							variant="link"
							onClick={() => setShowKitchens(!showKitchens)}
							className="p-2 text-primary d-flex align-items-center"
							style={{ boxShadow: 'none', border: 'none' }}
						>
							<MdOutlineSettings size={20} className="me-1" /> Seleccionar Cocina
						</Button>
						{/* cocina actual */}
						<span className="mx-2">
							{listKitchens && listKitchens.find((k) => k.id === kitchenSelectId)?.name || 'Cocina'}
						</span>
						{showKitchens && (
							<NavDropdown show>
								{userData?.assignedKitchens.map((kitchen) => (
									<NavDropdown.Item key={kitchen} onClick={() => changeKitchen(kitchen)}>
										{listKitchens.find((k) => k.id === kitchen)?.name || 'Cocina'}
									</NavDropdown.Item>
								))}
							</NavDropdown>
						)}
					</Col>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export { NavbarRecepcion };
