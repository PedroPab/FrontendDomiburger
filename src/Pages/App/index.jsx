import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ContextProvider } from "../../Context"
import Domiciliario from "../Domiciliario"
import Experimentos from "../Experimentos"
import Login from "../Login"
import Recepcion from "../Recepcion"
import ProtectedRoute from "../../components/ProtectedRoute/inde"
import { ROLES } from "../../Utils/constList"
import MapRecepcion from "../MapRecepcion"
import Cocina from "../Cocina"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute users={[ROLES.admin, ROLES.recepcion]} redirectTo={'/login'} />} >

        <Route path="/recepcion" element={<Recepcion />} />
        <Route path="/mapRecepcion" element={<MapRecepcion />} />
      </Route>
      <Route element={<ProtectedRoute users={[ROLES.domiciliario]} redirectTo={'/login'} />} >

        <Route path="/domiciliarios" element={<Domiciliario />} />
        <Route path="/domiciliario" element={<Domiciliario />} />

      </Route>
      <Route element={<ProtectedRoute users={[ROLES.cocinero]} redirectTo={'/login'} />} >

        <Route path="/cocina" element={<Cocina />} />

      </Route>
      {/* este deberia de ser el 404 */}
      <Route element={<ProtectedRoute redirectTo={'/'} />} >

        <Route path="/*" element={<Experimentos />} />

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