import { Route } from "react-router-dom";
import ProtectedRoute from "../../../components/ProtectedRoute";
import Recepcion from "../../Recepcion";
import Contabilidad from "../../Contabilidad";
import MapRecepcion from "../../Recepcion/MapRecepcion";
import FormAdmin from "../../Recepcion/FormAdmin";
import { ROLES } from "../../../Utils/constList";
import Pedidos from "../../Pedidos";
import PedidosDetails from "../../Pedidos/PedidosDetails";
import ProductosAdmin from "../../ProductosAdmin/ListProducts";


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
      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="/pedidos/:id" element={<PedidosDetails />} />
      <Route path="/productosAdmin" element={<ProductosAdmin />} />
    </Route>
  );
};

export { RecepcionRoutes };
