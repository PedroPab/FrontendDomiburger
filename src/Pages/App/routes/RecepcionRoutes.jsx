import { Route } from "react-router-dom";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { ROLES } from "../../../Utils/constList";
import { ContextProvider } from "../../../Context";
import { ContextProviderRecepcion } from "../../../Context/RecepcionContex";
import Recepcion from "../../Recepcion";
import Contabilidad from "../../Contabilidad";
import MapRecepcion from "../../Recepcion/MapRecepcion";
import FormAdmin from "../../Recepcion/FormAdmin";
import Pedidos from "../../Pedidos";
import PedidosDetails from "../../Pedidos/PedidosDetails";
import ProductosAdmin from "../../ProductosAdmin/ListProducts";
import CreateProduct from "../../ProductosAdmin/CreateProduct";
import { EstadisticasRoutes } from "./EstadisticasRoutes";
import { CodigoRoutes } from "./CodigoRoutes";
import { LOGIN_ROUTES, RECEPCION_ROUTES } from "../../../Utils/const/namesRutes"; // Importamos las rutas constantes
import Clientes from "../../Clientes/Clientes";

const routes = RECEPCION_ROUTES.routes;
const RecepcionRoutes = () => {
  return (
    <Route
      path={RECEPCION_ROUTES.path} // Usamos la constante para la ruta principal
      element={
        <ContextProvider>
          <ContextProviderRecepcion>
            <ProtectedRoute
              roles={[ROLES.admin, ROLES.recepcion]}
              redirectTo={LOGIN_ROUTES.path}
            />
          </ContextProviderRecepcion>
        </ContextProvider>
      }
    >
      <Route path='' element={<Recepcion />} />
      <Route path={routes.CONTABILIDAD} element={<Contabilidad />} />
      <Route path={routes.MAP_RECEPCION} element={<MapRecepcion />} />
      <Route path={routes.FORM_ADMIN} element={<FormAdmin />} />
      <Route path={routes.PEDIDOS} element={<Pedidos />} />
      <Route path={routes.PEDIDOS_DETAIL} element={<PedidosDetails />} />
      <Route path={routes.PRODUCTOS_ADMIN} element={<ProductosAdmin />} />
      <Route path={routes.CREATE_PRODUCT} element={<CreateProduct />} />
      <Route path={routes.CLIENTES} element={<Clientes />} />

      {EstadisticasRoutes()}
      {CodigoRoutes()}
    </Route>
  );
};

export { RecepcionRoutes };
