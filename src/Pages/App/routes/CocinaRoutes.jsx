import { Route } from "react-router-dom"
import ProtectedRoute from "../../../components/ProtectedRoute"
import Cocina from "../../Cocina"
import { ROLES } from "../../../Utils/constList"
import { ContextProvider } from "../../../Context"

const CocinaRoutes = () => {
  return (
    <Route
      path="cocina"
      element={
        <ContextProvider>
          <ProtectedRoute
            users={[ROLES.admin, ROLES.recepcion, ROLES.cocina, "cocinero"]}
            redirectTo="/login" />

        </ContextProvider>
      }>
      <Route index element={< Cocina />} />
    </Route >
  )
}

export { CocinaRoutes }