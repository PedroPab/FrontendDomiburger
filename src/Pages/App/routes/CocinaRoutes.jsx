import { Route } from "react-router-dom"
import ProtectedRoute from "../../../components/ProtectedRoute"
import Cocina from "../../Cocina"
import { ROLES } from "../../../Utils/constList"
import { ContextProvider } from "../../../Context"
import { LOGIN_ROUTES } from "../../../Utils/const/namesRutes"

const CocinaRoutes = () => {
  return (
    <Route
      path="cocina"
      element={
        <ContextProvider>
          <ProtectedRoute
            users={[ROLES.admin, ROLES.recepcion, ROLES.cocina, "cocinero"]}
            redirectTo={LOGIN_ROUTES.path}
          />

        </ContextProvider>
      }>
      <Route index element={< Cocina />} />
    </Route >
  )
}

export { CocinaRoutes }