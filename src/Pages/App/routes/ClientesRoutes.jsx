import { Route } from "react-router-dom";
import ProtectedRoute from "../../../components/ProtectedRoute";
import Clientes from "../../Clientes/Clientes";
import { ROLES } from "../../../Utils/constList";

const ClientesRoutes = () => {
  return (
    <Route
      path="clientes"
      element={
        <ProtectedRoute
          users={[ROLES.admin, ROLES.recepcion]}
          redirectTo="/login" />
      }>
      <Route index element={<Clientes />} />
    </Route>
  );
};

export { ClientesRoutes };