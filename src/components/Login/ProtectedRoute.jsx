// src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { LOGIN_ROUTES } from '../../Utils/const/namesRutes';

const ProtectedRoute = ({ children }) => {
  const { usuarioActual } = useContext(AuthContext);
  const location = useLocation();

  if (!usuarioActual) {
    return <Navigate to={LOGIN_ROUTES.path} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
