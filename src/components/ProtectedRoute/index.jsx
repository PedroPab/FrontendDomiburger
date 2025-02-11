import { Navigate, Outlet } from 'react-router-dom';
import { usePreferences } from '../../Context/PreferencesContext';
import { LOGIN_ROUTES } from '../../Utils/const/namesRutes';

const ProtectedRoute = ({ users, children, redirectTo = LOGIN_ROUTES.path }) => {
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
