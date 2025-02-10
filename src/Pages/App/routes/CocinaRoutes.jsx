import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "../../../components/ProtectedRoute"
import Cocina from "../../Cocina"
import { ROLES } from "../../../Utils/constList"
import { ContextProvider } from "../../../Context"

const CocinaRoutes = () => {
  return (
    <ContextProvider>
      <Routes>
        <Route
          element={
            <ProtectedRoute
              users={[ROLES.admin, ROLES.recepcion, ROLES.cocina, "cocinero"]}
              redirectTo="/login" />
          }>
          <Route key="Cocina" path="/cocina" element={< Cocina />} />
        </Route >
      </Routes>
    </ContextProvider>
  )
}

export { CocinaRoutes }