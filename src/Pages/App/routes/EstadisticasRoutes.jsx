import { Route } from "react-router-dom"
import EstadisticasDomiciliarios from "../../EstadisticasHome/EstadisticasDomiciliarios"
import EstadisticasVentasHoy from "../../EstadisticasHome/EstadisticasVentasHoy"
import EstadisticasClientes from "../../EstadisticasHome/EstadisticasClientes"
import EstadisticasHome from "../../EstadisticasHome"
import ProtectedRoute from "../../../components/ProtectedRoute"
import { ROLES } from "../../../Utils/constList"

const EstadisticasRoutes = () => {
  return (
    <Route
      element={
        <ProtectedRoute
          users={[ROLES.admin, ROLES.recepcion]}
          redirectTo="/login" />
      }>
      <Route path="/estadisticas/domiciliarios" element={<EstadisticasDomiciliarios />} />
      <Route path="/estadisticas/ventas/hoy" element={<EstadisticasVentasHoy />} />
      <Route path="/estadisticas/clientes" element={<EstadisticasClientes />} />
      <Route path="/estadisticas" element={<EstadisticasHome />} />
    </Route>
  )
}

export { EstadisticasRoutes }