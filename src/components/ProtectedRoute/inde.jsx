import { useContext } from 'react';
import { Navigate, Outlet, } from 'react-router-dom';
import { MiContexto } from './../../Context'; // Ajusta la importación según la ubicación de tu contexto de autenticación

const ProtectedRoute = ({ users, children, redirectTo }) => {
  const { tokenLogin } = useContext(MiContexto); // Ajusta el contexto de autenticación según tu implementación

  if (!users?.includes(tokenLogin.user.role) && users > 0 || users !== undefined) {
    console.log(`no es valido `);
    return <Navigate to={redirectTo} />
  }

  return children ? <children /> : <Outlet />
};

export default ProtectedRoute;
