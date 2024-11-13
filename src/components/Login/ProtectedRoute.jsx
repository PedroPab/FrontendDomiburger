// src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { usuarioActual } = useContext(AuthContext);
  const location = useLocation();

  if (!usuarioActual) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
