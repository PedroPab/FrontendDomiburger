import { Route } from "react-router-dom";
import { MeProfile } from "../../User/MeProfile";
import ProtectedRouteFirebase from "../../../components/ProtectedRouteFirebase";
import { ROLES } from "../../../Utils/constList";
import { CreateLocation } from "../../User/CreateLocation";
import MyLocations from "../../User/MyLocations";

const UserRoutes = () => {
  return (
    <Route
      path="/me"
      element={
        <ProtectedRouteFirebase
          role={ROLES.USER}
        />
      }
    >
      <Route index element={<MeProfile />} />
      <Route path={`ubicaciones`} element={<MyLocations />} />
      <Route path={`ubicaciones/crear`} element={<CreateLocation />} />
      <Route path={`order/crear`} element={<CreateLocation />} />

    </Route>
  );
};

export { UserRoutes };