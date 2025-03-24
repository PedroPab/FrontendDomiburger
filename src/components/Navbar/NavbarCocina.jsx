import React, { useContext } from 'react';
import { Container, Navbar, Nav, NavDropdown, Col, Row } from 'react-bootstrap';
import { BsMoonStars, BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from './../../assets/logo.png';
import { ConnectionStatusIndicator } from './ConnectionStatusIndicator';
import { OrderCountIndicator } from './OrderCountIndicator';
import { PreferencesContext } from '../../Context/PreferencesContext';
import { MdOutlineSettings } from 'react-icons/md';
import { LOGIN_ROUTES } from '../../Utils/const/namesRutes';
import { KitchenSelector } from './KitchenSelector';
import { UserMenu } from '../../Layout/UserMenu';
import { useAuth } from '../../Context/AuthContext';

const NavbarCocina = () => {
	const { isDarkMode, toggleTheme } = useContext(PreferencesContext);
	const { usuarioActual, handleLogout } = useAuth();
	// Configuración de los ítems para el menú de Ajustes
	const ajustesItems = [
		{
			title: 'Login',
			icon: <BsFillPersonFill className="me-1" size={18} />,
			route: LOGIN_ROUTES.path,
		},
		{
			title: 'Cambiar Tema',
			icon: <BsMoonStars className="me-1" size={18} />,
			onClick: toggleTheme,
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
					<Col xs="auto" className="d-none d-md-block">
						<OrderCountIndicator />
					</Col>

					{/* 4. Toggle del Navbar para móviles */}
					<Col xs="auto" className="d-lg-none text-end">
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
					</Col>
				</Row>

				{/* 5. Menú de Navegación */}
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">
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
							{ajustesItems.map((item, index) => (
								<NavDropdown.Item
									key={index}
									as={item.route ? Link : 'button'}
									to={item.route || undefined}
									onClick={item.onClick || undefined}
								>
									{item.icon}
									{item.title}
								</NavDropdown.Item>
							))}
						</NavDropdown>
						<UserMenu usuarioActual={usuarioActual} onLogout={handleLogout} />

					</Nav>
					<KitchenSelector />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export { NavbarCocina };
