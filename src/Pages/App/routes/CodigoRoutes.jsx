import { Route } from "react-router-dom"
import ProtectedRoute from "../../../components/ProtectedRoute"
import { ROLES } from "../../../Utils/constList"
import Codigos from "../../Codigo"
import CrearCodigoReferido from "../../Codigo/CrearCodigoReferido"
import CrearCodigoReferidoYaCreado from "../../Codigo/CrearCodigoReferidoYaCreado"
import { VisualizarCodigoReferidos } from "../../Codigo/VisualisarCodigosReferidos"
import { EditarCodigo } from "../../Codigo/EditarCodigo"

const CodigoRoutes = () => {
  return (
    <Route
      path="codigos"
      element={
        <ProtectedRoute
          users={[ROLES.admin, ROLES.recepcion]}
          redirectTo="/login" />
      }>
      <Route index element={<Codigos />} />
      <Route path="crearCodigoReferido" element={<CrearCodigoReferido />} />
      <Route path="crearCodigoYaCreado" element={<CrearCodigoReferidoYaCreado />} />
      <Route path="buscar" element={<VisualizarCodigoReferidos />} />
      <Route path="editar/:id" element={<EditarCodigo />} />

    </Route>
  )

}

export { CodigoRoutes }