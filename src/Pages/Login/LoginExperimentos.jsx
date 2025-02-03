// LoginExp.js
import React, { useState } from 'react';
import { registerWithEmail, loginWithEmail, logout } from './../../firebase/services';
import { useAuth } from '../../Context/AuthContext';


const LoginExp = () => {
  const { usuarioActual } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Se registra al usuario; la actualización del estado se realizará vía onAuthStateChanged en el AuthContext
      await registerWithEmail(email, password);
      alert('Usuario registrado correctamente');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      // Se inicia sesión; el AuthContext detectará el cambio de usuario
      await loginWithEmail(email, password);
      alert('Inicio de sesión exitoso');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert('Sesión cerrada');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Autenticación con Firebase</h1>
      {usuarioActual ? (
        <div>
          <p>Bienvenido, {usuarioActual.email}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Iniciar sesión</button>
          <button onClick={handleRegister}>Registrarse</button>
        </div>
      )}
    </div>
  );
};

export { LoginExp };
