import { Route } from "react-router-dom";
import ProtectedRoute from "../../../components/ProtectedRoute";
import Recepcion from "../../Recepcion";
import Contabilidad from "../../Contabilidad";
import MapRecepcion from "../../MapRecepcion";
import FormAdmin from "../../FormAdmin";
import { ROLES } from "../../../Utils/constList";

const RecepcionRoutes = () => {
  return (
    <Route
      element={
        <ProtectedRoute
          users={[ROLES.admin, ROLES.recepcion]}
          redirectTo="/login" />
      }>      <Route path="/recepcion" element={<Recepcion />} />
      <Route path="/contabilidad" element={<Contabilidad />} />
      <Route path="/mapRecepcion" element={<MapRecepcion />} />
      <Route path="/formAdmin" element={<FormAdmin />} />
    </Route>
  );
};

export { RecepcionRoutes };
