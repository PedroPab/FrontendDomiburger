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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute users={[ROLES.admin, ROLES.recepcion]} redirectTo={'/login'} />} >

        <Route path="/recepcion" element={<Recepcion />} />
        <Route path="/mapRecepcion" element={<MapRecepcion />} />
        <Route path="/contabilidad" element={<Contabilidad />} />

      </Route>
      <Route element={<ProtectedRoute users={[ROLES.domiciliario]} redirectTo={'/login'} />} >

        <Route path="/domiciliarios" element={<Domiciliario />} />
        <Route path="/domiciliario" element={<Domiciliario />} />

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