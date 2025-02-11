import { Route } from "react-router-dom";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { ROLES } from "../../../Utils/constList";
import Codigos from "../../Codigo";
import CrearCodigoReferido from "../../Codigo/CrearCodigoReferido";
import CrearCodigoReferidoYaCreado from "../../Codigo/CrearCodigoReferidoYaCreado";
import { VisualizarCodigoReferidos } from "../../Codigo/VisualisarCodigosReferidos";
import { EditarCodigo } from "../../Codigo/EditarCodigo";
import { CODIGO_ROUTES, LOGIN_ROUTES } from "../../../Utils/const/namesRutes"; // Importamos las rutas
const routes = CODIGO_ROUTES.routes
const CodigoRoutes = () => {
  return (
    <Route
      path={CODIGO_ROUTES.path} // Usamos la ruta principal de CODIGO_ROUTES
      element={
        <ProtectedRoute
          users={[ROLES.admin, ROLES.recepcion]}
          redirectTo={LOGIN_ROUTES.path}
        />
      }>
      <Route index element={<Codigos />} />
      <Route path={routes.CREATE_CODIGO_REFERIDO} element={<CrearCodigoReferido />} />
      <Route path={routes.CREATE_CODIGO_YA_CREADO} element={<CrearCodigoReferidoYaCreado />} />
      <Route path={routes.BUSCAR_CODIGOS} element={<VisualizarCodigoReferidos />} />
      <Route path={routes.EDITAR_CODIGO} element={<EditarCodigo />} />
    </Route>
  );
};

export { CodigoRoutes };
