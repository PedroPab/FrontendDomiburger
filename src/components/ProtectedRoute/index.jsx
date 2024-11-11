import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MiContexto } from '../../Context'; // Ajusta la importación según la ubicación de tu contexto de autenticación

const ProtectedRoute = ({ users, children, redirectTo = '/login' }) => {
  const { tokenLogin } = useContext(MiContexto); // Ajusta el contexto de autenticación según tu implementación

  // Si no se especifican usuarios permitidos, permite el acceso
  if (!users || users.length === 0) {
    return children ? children : <Outlet />;
  }

  // Verifica si el rol del usuario actual está en la lista de usuarios permitidos
  if (!users.includes(tokenLogin?.user?.role)) {
    console.error(`Acceso denegado para el rol: ${tokenLogin?.user?.role} , roles permitidos ${users}`);
    return <Navigate to={redirectTo} />;
  }

  // Renderiza el contenido protegido
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
