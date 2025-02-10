import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../../components/ProtectedRoute";
import Recepcion from "../../Recepcion";
import Contabilidad from "../../Contabilidad";
import MapRecepcion from "../../Recepcion/MapRecepcion";
import FormAdmin from "../../Recepcion/FormAdmin";
import { ROLES } from "../../../Utils/constList";
import Pedidos from "../../Pedidos";
import PedidosDetails from "../../Pedidos/PedidosDetails";
import ProductosAdmin from "../../ProductosAdmin/ListProducts";
import CreateProduct from "../../ProductosAdmin/CreateProduct";
import { ContextProvider } from "../../../Context";
import { ContextProviderRecepcion } from "../../../Context/RecepcionContex";
import { EstadisticasRoutes } from "./EstadisticasRoutes";
import { CodigoRoutes } from "./CodigoRoutes";
import { ClientesRoutes } from "./ClientesRoutes";


const RecepcionRoutes = () => {
  return (
    <Route
      path="/recepcion"
      element={
        <ContextProvider>
          <ContextProviderRecepcion>
            <ProtectedRoute
              users={[ROLES.admin, ROLES.recepcion]}
              redirectTo="/login" />
          </ContextProviderRecepcion>
        </ContextProvider>
      }>

      <Route index element={<Recepcion />} />
      <Route path="contabilidad" element={<Contabilidad />} />
      <Route path="mapRecepcion" element={<MapRecepcion />} />
      <Route path="formAdmin" element={<FormAdmin />} />
      <Route path="pedidos" element={<Pedidos />} />
      <Route path="pedidos/:id" element={<PedidosDetails />} />
      <Route path="productosAdmin" element={<ProductosAdmin />} />
      <Route path="createProduct" element={<CreateProduct />} />

      {EstadisticasRoutes()}
      {CodigoRoutes()}
      {ClientesRoutes()}
    </Route>
  );
};


export { RecepcionRoutes };
