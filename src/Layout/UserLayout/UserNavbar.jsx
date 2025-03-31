import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usePreferences } from "../../Context/PreferencesContext";
import { useAuth } from "../../Context/AuthContext";
import logo from "./../../assets/logo.png";
import { FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import "./UserNavbar.css";
import { USER_ROUTES } from "../../Utils/const/namesRutes";
import { UserMenu } from "../UserMenu";

const UserNavbar = () => {
	const { isDarkMode } = usePreferences();
	const { usuarioActual, handleLogout } = useAuth();


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
						{/* <Nav.Link as={Link} to="/" className="d-flex align-items-center gap-2">
							<FaShoppingCart /> Pedir ahora
						</Nav.Link>

						<Nav.Link as={Link} to={USER_ROUTES.routes.LOCATIONS} className="d-flex align-items-center gap-2">
							<FaMapMarkerAlt /> Ubicaciones
						</Nav.Link>

						<Nav.Link as={Link} to={USER_ROUTES.routes.CREATE_ORDER} className="d-flex align-items-center gap-2">
							<FaShoppingCart /> Pedir Ya Nuevo
						</Nav.Link> */}
					</Nav>

					{/* SECCIÓN DE USUARIO */}
					{/* Botón para cambiar tema */}

					{/* Si el usuario está autenticado, mostrar menú de usuario sin flecha */}
					<UserMenu usuarioActual={usuarioActual} onLogout={handleLogout} />

				</Navbar.Collapse>
			</Container>
		</Navbar >
	);
};

export { UserNavbar };
