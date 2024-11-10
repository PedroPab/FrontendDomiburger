import { Route } from "react-router-dom";
import Domiciliario from "../../Domiciliario";
import DomiciliarioHistory from "../../DomiciliarioHistory";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { ROLES } from "../../../Utils/constList";

const DomiciliarioRoutes = () => {
  return (
    <Route
      element={
        <ProtectedRoute
          users={[ROLES.admin, ROLES.domiciliario]}
          redirectTo="/login" />
      }>
      <Route path="/domiciliarios" element={<Domiciliario />} />
      <Route path="/domiciliario" element={<Domiciliario />} />
      <Route path="/domiciliario/history" element={<DomiciliarioHistory />} />
    </Route>
  );
}

export { DomiciliarioRoutes }