import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_ROUTES } from '../../Utils/const/namesRutes';
import { useAuth } from '../../Context/AuthContext';

const ProtectedRoute = ({ roles, children, redirectTo = LOGIN_ROUTES.routes.LOGIN_AUTH }) => {
  const { usuarioActual } = useAuth()

  // Si no se especifican usuarios permitidos, permite el acceso
  if (!roles || roles.length === 0) {
    return children ? children : <Outlet />;
  }

  console.log(`Role====> ${usuarioActual?.roles}`)

  const userRoles = usuarioActual?.roles || []; // Asegúrate de que sea un array

  // Verifica si el rol del usuario actual está en la lista de usuarios permitidos
  if (!userRoles.some(role => roles.includes(role))) {
    console.error(`Acceso denegado para el rol: ${usuarioActual?.roles} , roles permitidos ${roles}`);
    return <Navigate to={redirectTo} />;
  }

  // contenido protegido
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
