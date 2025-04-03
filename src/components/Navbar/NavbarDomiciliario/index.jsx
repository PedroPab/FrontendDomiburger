/* eslint-disable react/prop-types */
import { Container, Navbar, Nav, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './../../../assets/logo.png';
import { FaHome, FaHistory } from "react-icons/fa";
import { ConnectionStatusIndicator } from '../ConnectionStatusIndicator';
import { OrderCountIndicator } from '../OrderCountIndicator';
import { UserMenu } from '../../../Layout/UserMenu';
import { useAuth } from '../../../Context/AuthContext';
import { usePreferences } from '../../../Context/PreferencesContext';
import { DOMICILIARIO_ROUTES } from '../../../Utils/const/namesRutes';

const routes = DOMICILIARIO_ROUTES.routes

const NavbarDomiciliario = () => {

	const { isDarkMode } = usePreferences();
	const { usuarioActual, handleLogout } = useAuth();
	return (
		<Navbar expand="lg" className="sticky-top" bg={isDarkMode ? 'dark' : 'light'}>
			<Container fluid className="m-1">
				<Row className="w-100 align-items-center justify-content-between">
					{/* 1. Logo */}
					<Col xs="auto">
						<Navbar.Brand as={Link} to="/">
							<img
								src={logo}  // Reemplaza con la ruta de tu logo
								alt="Domiburguer"
								height="30"
								className="d-inline-block align-top"
							/>
						</Navbar.Brand>
					</Col>

					{/* 2. Indicador de Conexión */}
					<Col xs="auto">
						<ConnectionStatusIndicator />
					</Col>

					{/* 3. Conteo de Pedidos (solo visible en pantallas medianas y grandes) */}
					<Col xs="auto" >
						<OrderCountIndicator />
					</Col>

					{/* 4. Navbar Toggle */}
					<Col xs="auto" className="text-end d-lg-none">
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
					</Col>
				</Row>

				{/* 5. Navbar Collapse (Menú de Navegación) */}
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{/* Enlaces del Menú */}
						<Nav.Link as={Link} to={DOMICILIARIO_ROUTES.path}>
							<FaHome className="me-2" /> Home
						</Nav.Link>
						<Nav.Link as={Link} to={routes.DOMICILIARIO_HISTORY}>
							<FaHistory className="me-2" /> Mis pedidos
						</Nav.Link>
					</Nav>

					<UserMenu usuarioActual={usuarioActual} onLogout={handleLogout} />

				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export { NavbarDomiciliario };
