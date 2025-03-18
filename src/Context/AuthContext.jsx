import { createContext, useState, useEffect, useContext } from 'react';
import { FirebaseAuth } from '../firebase/config';
import { onAuthStateChanged, getIdToken, signOut } from 'firebase/auth';
import { LOGIN_ROUTES } from '../Utils/const/namesRutes';
import { useNavigate } from 'react-router-dom';
import { UsersService } from '../apis/clientV2/usersService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [usuarioActual, setUsuarioActual] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	// Función para obtener el ID Token manualmente
	const refreshToken = async () => {
		if (usuarioActual) {
			try {
				const newToken = await getIdToken(usuarioActual, true); // true fuerza la actualización
				setToken(newToken);
				console.log("Nuevo ID Token:", newToken);
			} catch (error) {
				console.error("Error al actualizar el token:", error);
			}
		}
	};



	useEffect(() => {
		// Escuchar cambios en la autenticación
		const unsubscribe = onAuthStateChanged(FirebaseAuth, async (user) => {
			//agregamos los roles asignados al usuario de manera fácil y accesible
			const customAttributes = user?.reloadUserInfo?.customAttributes || '{}'
			const roles = JSON.parse(customAttributes)?.roles || []

			if (user) user.roles = roles || []

			setUsuarioActual(user);
			if (user) {
				const fetchedToken = await getIdToken(user);
				setToken(fetchedToken);
			} else {
				setToken(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);


	const handleLogout = async () => {
		try {
			await signOut(FirebaseAuth);
			console.log("Sesión cerrada con éxito");
			navigate(LOGIN_ROUTES.routes.LOGIN_AUTH);
		} catch (error) {
			console.error("Error al cerrar sesión:", error);
		}
	};

	const [userData, setUserData] = useState(null);
	const usersService = new UsersService(token);
	useEffect(() => {
		const fetchUserData = async () => {
			const response = await usersService.me();
			const userData = response.data.body;
			setUserData(userData);
		};
		fetchUserData();
	}, [token]);

	const isValidToken = async () => {
		return onAuthStateChanged(FirebaseAuth, async (user) => {
			if (user) {
				const fetchedToken = await getIdToken(user);
				setToken(fetchedToken);
			} else {
				console.log("No hay usuario autenticado");
				setToken(null);
			}
		}
		)
	}

	return (
		<AuthContext.Provider value={{
			usuarioActual,
			token,
			refreshToken,
			handleLogout,
			userData,
			isValidToken
		}}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

// Hook para usar el contexto en otros componentes
export const useAuth = () => useContext(AuthContext);
