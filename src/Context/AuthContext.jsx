// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { FirebaseAuth } from '../firebase/config';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, async (user) => {
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

  return (
    <AuthContext.Provider value={{ usuarioActual, token }}>
      {/* Se renderiza children solo cuando se ha terminado la carga */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
