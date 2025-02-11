import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../Context/AuthContext';

const ProtectedRouteFirebase = ({ children }) => {
  const { usuarioActual } = useAuth();

  if (!usuarioActual) {
    return <Navigate to="/login1" />;
  }
  console.log(`pasaste la prueba ...`)

  return children ? children : <Outlet />;
};

export default ProtectedRouteFirebase;