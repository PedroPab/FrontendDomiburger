import { Route, Routes } from "react-router-dom";
import { MeProfile } from "../../User/MeProfile";
import ProtectedRouteFirebase from "../../../components/ProtectedRouteFirebase";
import { ROLES } from "../../../Utils/constList";
import { CreateLocation } from "../../User/CreateLocation";
import MyLocations from "../../User/MyLocations";

const UserRoutes = () => {
  return (
    <Routes >
      <Route
        path="/me"
        element={
          <ProtectedRouteFirebase
            role={ROLES.USER}
          />
        }
      >
      </Route>
      <Route index element={<MeProfile />} />
      <Route path={`ubicaciones`} element={<MyLocations />} />
      <Route path={`ubicaciones/crear`} element={<CreateLocation />} />
      <Route path={`order/crear`} element={<CreateLocation />} />

    </Routes>
  );
};

export { UserRoutes };