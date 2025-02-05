import React, { createContext, useState, useEffect, useContext } from 'react';
import { FirebaseAuth } from '../firebase/config';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <AuthContext.Provider value={{ usuarioActual, token, refreshToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useAuth = () => useContext(AuthContext);
