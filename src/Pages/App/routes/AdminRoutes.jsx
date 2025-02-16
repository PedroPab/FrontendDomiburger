import { Route } from "react-router-dom";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { ROLES } from "../../../Utils/constList";
import { ContextProvider } from "../../../Context";
import { LOGIN_ROUTES, ADMIN_ROUTES } from "../../../Utils/const/namesRutes"; // Importamos las rutas constantes
import { AdminDashboard } from "../../Admin";
import { AdminUser } from "../../Admin/AdminUser";

const routes = ADMIN_ROUTES.routes;

const AdminRoutes = () => {
  return (
    <Route
      path={ADMIN_ROUTES.path} // Usamos la constante para la ruta principal
      element={
        <ContextProvider>
          <ProtectedRoute
            roles={[ROLES.admin]}
            redirectTo={LOGIN_ROUTES.path}
          />
        </ContextProvider>
      }
    >
      <Route path={`${ADMIN_ROUTES.path}`} element={<AdminDashboard />} />
      <Route path={`${routes.KITCHEN_MANAGEMENT}`} element={<AdminDashboard />} />
      <Route path={`${routes.USER_MANAGEMENT}`} element={<AdminUser />} />
    </Route>
  );
};

export { AdminRoutes };
