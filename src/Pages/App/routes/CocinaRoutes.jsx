import { Route } from "react-router-dom"
import ProtectedRoute from "../../../components/ProtectedRoute"
import Cocina from "../../Cocina"
import { ROLES } from "../../../Utils/constList"

const CocinaRoutes = () => {
  return (
    <Route
      element={
        <ProtectedRoute
          users={[ROLES.admin, ROLES.recepcion]}
          redirectTo="/login" />
      }>
      <Route key="Cocina" path="/cocina" element={< Cocina />} />
    </Route >
  )
}

export { CocinaRoutes }