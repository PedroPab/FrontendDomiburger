import React, { createContext, useState, useEffect, useContext } from 'react';
import { FirebaseAuth } from '../firebase/config';
import { onAuthStateChanged, getIdToken, signOut } from 'firebase/auth';
import { LOGIN_ROUTES } from '../Utils/const/namesRutes';
import { useNavigate } from 'react-router-dom';

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
        console.log("ID Token obtenido:", fetchedToken);
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

  return (
    <AuthContext.Provider value={{
      usuarioActual,
      token,
      refreshToken,
      handleLogout,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useAuth = () => useContext(AuthContext);
