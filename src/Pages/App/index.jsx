import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ContextProvider } from "../../Context"
import Domiciliario from "../Domiciliario"
import NotFoundPage from "../NotFoundPage"
import Login from "../Login"
import Recepcion from "../Recepcion"
import ProtectedRoute from "../../components/ProtectedRoute/inde"
import { ROLES } from "../../Utils/constList"
import MapRecepcion from "../MapRecepcion"
import Contabilidad from "../Contabilidad"
import Cocina from "../Cocina"
import MapCocina from "../MapCocina"
import DomiciliarioHistory from "../DomiciliarioHistory"
import EstadisticasDomiciliarios from "../EstadisticasHome/EstadisticasDomiciliarios"
import FormClient from "../FormClient"
import EstadisticasHome from "../EstadisticasHome"
import EstadisticasVentasHoy from "../EstadisticasHome/EstadisticasVentasHoy"
import EstadisticasClientes from "../EstadisticasHome/EstadisticasClientes"
import Codigos from "../Codigo"
import CrearCodigoReferido from "../Codigo/CrearCodigoReferido"
import CrearCodigoReferidoYaCreado from "../Codigo/CrearCodigoReferidoYaCreado"
import Experimentos from "../Experimentos"
import { VisualizarCodigoReferidos } from "../Codigo/VisualisarCodigosReferidos"
import ClienteInfo from "../Clientes/ClientesInfo"
import { EditarCodigo } from "../Codigo/EditarCodigo"
import FormAdmin from "../FormAdmin"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FormClient />} />
      <Route path="/experimentos" element={<Experimentos />} />

      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute users={[ROLES.admin, ROLES.recepcion]} redirectTo={'/login'} />} >

        <Route path="/recepcion" element={<Recepcion />} />

        <Route path="/formAdmin" element={<FormAdmin />} />

        <Route path="/mapRecepcion" element={<MapRecepcion />} />
        <Route path="/contabilidad" element={<Contabilidad />} />

        <Route path="/estadisticas/domiciliarios" element={<EstadisticasDomiciliarios />} />
        <Route path="/estadisticas/ventas/hoy" element={<EstadisticasVentasHoy />} />
        <Route path="/estadisticas/clientes" element={<EstadisticasClientes />} />
        <Route path="/estadisticas" element={<EstadisticasHome />} />

        <Route path="/codigos" element={<Codigos />} />
        <Route path="/codigos/crearCodigoReferido" element={<CrearCodigoReferido />} />
        <Route path="/codigos/crearCodigoYaCreado" element={<CrearCodigoReferidoYaCreado />} />
        <Route path="/codigos/buscar" element={<VisualizarCodigoReferidos />} />
        <Route path="/codigos/editar/:id" element={<EditarCodigo />} />

        {/* clientes */}
        <Route path="/clientes/:id" element={<ClienteInfo />} />


      </Route>
      <Route element={<ProtectedRoute users={[ROLES.domiciliario]} redirectTo={'/login'} />} >

        <Route path="/domiciliarios" element={<Domiciliario />} />
        <Route path="/domiciliario" element={<Domiciliario />} />
        <Route path="/domiciliario/history" element={<DomiciliarioHistory />} />

      </Route>
      <Route element={<ProtectedRoute users={[ROLES.cocinero]} redirectTo={'/login'} />} >

        <Route path="/cocina" element={<Cocina />} />
        <Route path="/mapCocina" element={<MapCocina />} />

      </Route>

      {/* este deberia de ser el 404 */}
      <Route element={<ProtectedRoute redirectTo={'/'} />} >

        <Route path="/*" element={<NotFoundPage />} />

      </Route>
    </Routes>
  );
}

const App = () => {
  return (
    <ContextProvider>

      <BrowserRouter>
        <Routes>
        </Routes>
        <AppRoutes />
      </BrowserRouter>

    </ContextProvider>
  )
}

export default App