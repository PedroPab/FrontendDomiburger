import { Route } from "react-router-dom"
import Experimentos from "../../Experimentos"
import NotFoundPage from "../../NotFoundPage"
import { LoginExp } from "../../Login/LoginExperimentos"
import { MeProfile } from "../../User/MeProfile";

import ProtectedRouteFirebase from "../../../components/ProtectedRouteFirebase";
import { AuthProvider } from "../../../Context/AuthContext";
import MyLocations from "../../User/MyLocations";
import { CreateLocation } from "../../User/CreateLocation";
import OrderContainerUser from "../../User/createOrder/OrderContainerUser";

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
    <Route key='locations' path={`${ROUTES.ME}/ubicaciones`} element={
      <AuthProvider>
        <ProtectedRouteFirebase role={ROLES.USER}>
          <MyLocations />.
        </ProtectedRouteFirebase>
      </AuthProvider>
    } />,
    <Route key='CreateLocations' path={`${ROUTES.ME}/ubicaciones/crear`} element={
      <AuthProvider>
        <ProtectedRouteFirebase role={ROLES.USER}>
          <CreateLocation />
        </ProtectedRouteFirebase>
      </AuthProvider>
    } />,
    <Route key='Pedir' path={`${ROUTES.ME}/order`} element={
      <AuthProvider>
        <ProtectedRouteFirebase role={ROLES.USER}>
          <OrderContainerUser />
        </ProtectedRouteFirebase>
      </AuthProvider>
    } />,

  ]
}

export { GeneralRoutes }