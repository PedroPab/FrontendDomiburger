import { Route } from "react-router-dom";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { ROLES } from "../../../Utils/constList";
import { ContextProvider } from "../../../Context";
import { LOGIN_ROUTES, ADMIN_ROUTES } from "../../../Utils/const/namesRutes"; // Importamos las rutas constantes
import { AdminDashboard } from "../../Admin";
import { AdminUser } from "../../Admin/AdminUser";
import { AdminKitchens } from "../../Admin/AdminKitchens";
import { CreateKitchen } from "../../Admin/CreateKitchen";
import { CreateProduct } from "../../Admin/CreateProduct";
import { AdminProducts } from "../../Admin/AdminProducts";

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
      <Route path={`${routes.KITCHEN_MANAGEMENT}`} element={<AdminKitchens />} />
      <Route path={`${routes.USER_MANAGEMENT}`} element={<AdminUser />} />
      <Route path={`${routes.KITCHEN_CREATE}`} element={<CreateKitchen />} />
      <Route path={`${routes.PRODUCT_MANAGEMENT}`} element={<AdminProducts />} />
      <Route path={`${routes.CREATE_PRODUCT}`} element={<CreateProduct />} />
    </Route>
  );
};

export { AdminRoutes };
