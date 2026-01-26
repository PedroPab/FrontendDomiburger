import { Route } from "react-router-dom";
import Domiciliario from "../../Domiciliario";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { ROLES } from "../../../Utils/constList";
import { ContextProvider } from "../../../Context";
import { DOMICILIARIO_ROUTES, LOGIN_ROUTES } from "../../../Utils/const/namesRutes";
import { WorkerProvider } from "../../../Context/WorkerContext";
import { CourierHistory } from "../../Domiciliario/CourierHistory";

const DomiciliarioRoutes = () => {
  return (
    <Route
      path={`${DOMICILIARIO_ROUTES.path}`}
      element={
        <ContextProvider>
          <WorkerProvider>
            <ProtectedRoute
              users={[ROLES.domiciliario]}
              redirectTo={LOGIN_ROUTES.path} />
          </WorkerProvider>
        </ContextProvider>
      }>
      <Route index element={<Domiciliario />} />
      <Route path={DOMICILIARIO_ROUTES.routes.DOMICILIARIO_HISTORY} element={<CourierHistory />} />
      {/* <Route path={DOMICILIARIO_ROUTES.routes.DOMICILIARIO_HISTORY} element={<DomiciliarioHistory />} /> */}
    </Route>
  );
}

export { DomiciliarioRoutes }