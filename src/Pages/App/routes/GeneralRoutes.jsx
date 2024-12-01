import { Route } from "react-router-dom"
import Experimentos from "../../Experimentos"
import NotFoundPage from "../../NotFoundPage"
import { LoginExp } from "../../Login/LoginExperimentos"
import { MeProfile } from "../../User/MeProfile";

import ProtectedRouteFirebase from "../../../components/ProtectedRouteFirebase";
import { AuthProvider } from "../../../Context/AuthContext";

// Definir constantes para rutas y roles
const ROUTES = {
  ME: '/me',
};

const ROLES = {
  USER: 'user',
};

// Componente separado para la ruta protegida
const MeRoute = () => (
  <AuthProvider>
    <ProtectedRouteFirebase role={ROLES.USER}>
      <MeProfile />
    </ProtectedRouteFirebase>
  </AuthProvider>
);

const GeneralRoutes = () => {
  return [
    <Route key="experimentos" path="/experimentos" element={<Experimentos />} />,
    <Route key="404" path="/*" element={<NotFoundPage />} />,
    <Route key="loginEx" path="loginEx" element={<LoginExp />} />,
    <Route key="home" path="/home" element={<Experimentos />} />,

    // Uso del componente separado en la definición de rutas
    <Route key='me' path={ROUTES.ME} element={<MeRoute />} />,
  ]
}

export { GeneralRoutes }