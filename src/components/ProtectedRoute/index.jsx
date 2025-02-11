import { Navigate, Outlet } from 'react-router-dom';
import { usePreferences } from '../../Context/PreferencesContext';

const ProtectedRoute = ({ users, children, redirectTo = '/login' }) => {
  const { tokenLogin } = usePreferences()


  // Si no se especifican usuarios permitidos, permite el acceso
  if (!users || users.length === 0) {
    return children ? children : <Outlet />;
  }

  console.log(`Role====> ${tokenLogin?.user?.role}`)

  // Verifica si el rol del usuario actual está en la lista de usuarios permitidos
  if (!users.includes(tokenLogin?.user?.role)) {
    console.error(`Acceso denegado para el rol: ${tokenLogin?.user?.role} , roles permitidos ${users}`);
    return <Navigate to={redirectTo} />;
  }

  // Renderiza el contenido protegido
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
