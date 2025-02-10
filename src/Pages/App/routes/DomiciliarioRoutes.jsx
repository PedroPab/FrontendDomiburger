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
          element={
            <ProtectedRoute
              users={[ROLES.admin, ROLES.domiciliario]}
              redirectTo="/login" />
          }>
          <Route path="/domiciliarios" element={<Domiciliario />} />
          <Route path="/domiciliario" element={<Domiciliario />} />
          <Route path="/domiciliario/history" element={<DomiciliarioHistory />} />
        </Route>
      </Routes>
    </ContextProvider>

  );
}

export { DomiciliarioRoutes }