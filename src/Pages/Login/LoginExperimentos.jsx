import { useState } from 'react';
import { registerWithEmail, loginWithEmail, logout } from './../../firebase/services';

const LoginExp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleRegister = async () => {
    try {
      const newUser = await registerWithEmail(email, password);
      setUser(newUser);
      alert('Usuario registrado correctamente');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const loggedInUser = await loginWithEmail(email, password);
      setUser(loggedInUser);
      alert('Inicio de sesión exitoso');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    alert('Sesión cerrada');
  };

  return (
    <div>
      <h1>Autenticación con Firebase</h1>
      {user ? (
        <div>
          <p>Bienvenido, {user.email}</p>
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
