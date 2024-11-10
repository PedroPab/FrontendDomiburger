import { Route } from "react-router-dom"
import ClienteInfo from "../../Clientes/ClientesInfo"
import ProtectedRoute from "../../../components/ProtectedRoute"
import { ROLES } from "../../../Utils/constList"

const ClientesRoutes = () => {
  return (
    <Route
      element={
        <ProtectedRoute
          users={[ROLES.admin, ROLES.recepcion]}
          redirectTo="/login" />
      }>      <Route path="/clientes/:id" element={<ClienteInfo />} />
    </Route>
  )
}
export { ClientesRoutes }