import { Route } from "react-router-dom";
import Domiciliario from "../../Domiciliario";
import DomiciliarioHistory from "../../DomiciliarioHistory";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { ROLES } from "../../../Utils/constList";
import { ContextProvider } from "../../../Context";

const DomiciliarioRoutes = () => {
  return (
    <Route
      path="/domiciliario"
      element={
        <ContextProvider>
          <ProtectedRoute
            users={[ROLES.admin, ROLES.domiciliario]}
            redirectTo="/login" />
        </ContextProvider>
      }>
      <Route index element={<Domiciliario />} />
      <Route path="domiciliario/history" element={<DomiciliarioHistory />} />
    </Route>
  );
}

export { DomiciliarioRoutes }