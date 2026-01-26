// src/components/Login.jsx
import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseAuth } from '../../firebase/config';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import { UserLayout } from '../../Layout/UserLayout';

const Login1 = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const location = useLocation();

  // Determinar la ruta de redirección (si existe)
  const from = location.state?.from?.pathname || '/me';

  // const handleLogin = async (e) => {
  // 	e.preventDefault();
  // 	setError('');
  // 	try {
  // 		const ho = await signInWithEmailAndPassword(FirebaseAuth, email, password);
  // 		console.log(`[ ~ handleLogin ~ ho]`, ho)
  // 		setSuccess('¡Inicio de sesión exitoso!');
  // 		setTimeout(() => {
  // 			navigate(from, { replace: true });
  // 		}, 1000);
  // 	} catch (error) {
  // 		console.error('Error al iniciar sesión:', error);
  // 		if (error.code === 'auth/wrong-password') {
  // 			setError('La contraseña es incorrecta. Inténtalo de nuevo.');
  // 		} else if (error.code === 'auth/user-not-found') {
  // 			setError('No se encontró una cuenta con este correo electrónico.');
  // 		} else {
  // 			setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
  // 		}
  // 	}
  // };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const loginRta = await signInWithPopup(FirebaseAuth, provider);
      console.log(loginRta);
      console.table(loginRta);
      setSuccess('¡Inicio de sesión con Google exitoso!');
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setError('La ventana de inicio de sesión se cerró antes de completar el proceso.');
      } else {
        setError('Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
    <UserLayout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Inicio de Sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            {/* <form onSubmit={handleLogin}>
				<div className="mb-3">
				<label className="form-label">Correo Electrónico</label>
				<input
					type="email"
					className="form-control"
					placeholder="Ingresa tu correo"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					autoComplete="username"
				/>
				</div>
				<div className="mb-3">
				<label className="form-label">Contraseña</label>
				<input
					type="password"
					className="form-control"
					placeholder="Ingresa tu contraseña"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					autoComplete="current-password"
				/>
				</div>
				<button type="submit" className="btn btn-primary w-100">
				Iniciar Sesión
				</button>
			</form> */}
            <hr />
            <div className="text-center mb-4">
              <p className="text-muted">
                Inicia sesión con un solo clic y disfruta de una experiencia rápida y segura.
              </p>
            </div>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="btn w-100 border mb-5"
              onClick={handleGoogleLogin}
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google logo"
                className="me-2"
              />
              Iniciar sesión con Google
            </Button>

          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export { Login1 };
