import { Route } from "react-router-dom";
import EstadisticasDomiciliarios from "../../EstadisticasHome/EstadisticasDomiciliarios";
import EstadisticasVentasHoy from "../../EstadisticasHome/EstadisticasVentasHoy";
import EstadisticasClientes from "../../EstadisticasHome/EstadisticasClientes";
import EstadisticasHome from "../../EstadisticasHome";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { ROLES } from "../../../Utils/constList";
import { ESTADISTICAS_ROUTES, LOGIN_ROUTES } from "../../../Utils/const/namesRutes";

const routes = ESTADISTICAS_ROUTES.routes;

const EstadisticasRoutes = () => {
  return (
    <Route
      path={ESTADISTICAS_ROUTES.path} // Usamos la ruta base de ESTADISTICAS_ROUTES
      element={
        <ProtectedRoute
          users={[ROLES.admin, ROLES.recepcion]}
          redirectTo={LOGIN_ROUTES.path}
        />
      }
    >
      <Route
        path={routes.ESTADISTICAS_DOMICILIARIOS} // Usamos la ruta de domiciliarios
        element={<EstadisticasDomiciliarios />}
      />
      <Route
        path={routes.ESTADISTICAS_VENTAS_HOY} // Usamos la ruta de ventas hoy
        element={<EstadisticasVentasHoy />}
      />
      <Route
        path={routes.ESTADISTICAS_CLIENTES} // Usamos la ruta de clientes
        element={<EstadisticasClientes />}
      />
      <Route index element={<EstadisticasHome />} />
    </Route>
  );
};

export { EstadisticasRoutes };
