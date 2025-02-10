import { Route, Routes } from "react-router-dom";
import Domiciliario from "../../Domiciliario";
import DomiciliarioHistory from "../../DomiciliarioHistory";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { ROLES } from "../../../Utils/constList";
import { ContextProvider } from "../../../Context";

const DomiciliarioRoutes = () => {
  return (
    <ContextProvider>
      <Routes>
        <Route
          path="/domiciliario"
          element={
            <ProtectedRoute
              users={[ROLES.admin, ROLES.domiciliario]}
              redirectTo="/login" />
          }>
          <Route index element={<Domiciliario />} />
          <Route path="domiciliario/history" element={<DomiciliarioHistory />} />
        </Route>
      </Routes>
    </ContextProvider>

  );
}

export { DomiciliarioRoutes }