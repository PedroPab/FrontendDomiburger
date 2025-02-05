
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRouteFirebase = ({ children }) => {
  const { usuarioActual } = useAuth();
  console.log(`User: `, usuarioActual)

  if (!usuarioActual) {
    return <Navigate to="/login1" />;
  }

  return children;
};

export default ProtectedRouteFirebase;