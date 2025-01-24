
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRouteFirebase = ({ children }) => {
  const { usuarioActual } = useAuth();
  if (!usuarioActual) {
    return <Navigate to="/login1" />;
  }

  return children;
};

export default ProtectedRouteFirebase;