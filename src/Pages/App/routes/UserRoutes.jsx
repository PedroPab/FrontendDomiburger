import { Route } from "react-router-dom";
import { MeProfile } from "../../User/MeProfile";
import ProtectedRouteFirebase from "../../../components/ProtectedRouteFirebase";
import { CreateLocation } from "../../User/CreateLocation";
import MyLocations from "../../User/MyLocations";
import { CreateOrder } from "../../User/CreateOrder";
import { USER_ROUTES } from "../../../Utils/const/namesRutes";
import ThankYou from "../../TanksYou/ThankYou";

const UserRoutes = () => {
  return (
    <Route
      path={USER_ROUTES.path}
      element={
        <ProtectedRouteFirebase />
      }
    >
      <Route path="" element={<MeProfile />} />
      <Route path={USER_ROUTES.routes.LOCATIONS} element={<MyLocations />} />
      <Route path={USER_ROUTES.routes.CREATE_LOCATION} element={<CreateLocation />} />
      <Route path={USER_ROUTES.routes.CREATE_ORDER} element={<CreateOrder />} />
      <Route path={USER_ROUTES.routes.THANKS} element={<ThankYou />} />

    </Route>
  );
};

export { UserRoutes };