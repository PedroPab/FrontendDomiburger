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
import EstadisticasDomiciliarios from "../EstadisticasDomiciliarios"
import FormClient from "../FormClient"
import EstadisticasHome from "../EstadisticasHome"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FormClient />} />

      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute users={[ROLES.admin, ROLES.recepcion]} redirectTo={'/login'} />} >

        <Route path="/recepcion" element={<Recepcion />} />
        <Route path="/mapRecepcion" element={<MapRecepcion />} />
        <Route path="/contabilidad" element={<Contabilidad />} />

        <Route path="/estadisticas/domiciliarios" element={<EstadisticasDomiciliarios />} />
        <Route path="/estadisticas" element={<EstadisticasHome />} />

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