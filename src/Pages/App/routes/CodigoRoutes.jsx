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
      element={
        <ProtectedRoute
          users={[ROLES.admin, ROLES.recepcion]}
          redirectTo="/login" />
      }>
      <Route path="/Codigos" element={<Codigos />} />
      <Route path="/codigos/crearCodigoReferido" element={<CrearCodigoReferido />} />
      <Route path="/codigos/crearCodigoYaCreado" element={<CrearCodigoReferidoYaCreado />} />
      <Route path="/codigos/buscar" element={<VisualizarCodigoReferidos />} />
      <Route path="/codigos/editar/:id" element={<EditarCodigo />} />

    </Route>
  )

}

export { CodigoRoutes }