import { useContext } from 'react';
import { Container, Navbar, Nav, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './../../assets/logo.png';
import { ConnectionStatusIndicator } from './ConnectionStatusIndicator';
import { OrderCountIndicator } from './OrderCountIndicator';
import { PreferencesContext } from '../../Context/PreferencesContext';
import { KitchenSelector } from './KitchenSelector';
import { UserMenu } from '../../Layout/UserMenu';
import { useAuth } from '../../Context/AuthContext';

const NavbarCocina = () => {
	const { isDarkMode, } = useContext(PreferencesContext);
	const { usuarioActual, handleLogout } = useAuth();
	// Configuración de los ítems para el menú de Ajustes

	return (
		<Navbar
			expand="lg"
			sticky="top"
			bg={isDarkMode ? 'dark' : 'light'}
			variant={isDarkMode ? 'dark' : 'light'}
			className="shadow-sm"
		>
			<Container fluid className="px-3 py-2">
				<Row className="w-100 align-items-center justify-content-between g-2">
					{/* 1. Logo */}
					<Col xs="auto">
						<Navbar.Brand as={Link} to="/">
							<img
								src={logo}
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

					{/* 3. Conteo de Pedidos (visible en pantallas medianas y superiores) */}
					<Col xs="auto" className="">
						<OrderCountIndicator />
					</Col>

					{/* 3. Selector de Cocina */}
					<Col xs="auto" className="d-none d-md-block">
						<KitchenSelector />
					</Col>

					{/* 4. Toggle del Navbar para móviles */}
					<Col xs="auto" className="d-lg-none text-end">
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
					</Col>
				</Row>

				{/* 5. Menú de Navegación */}
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">

						<UserMenu usuarioActual={usuarioActual} onLogout={handleLogout} />

					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export { NavbarCocina };
