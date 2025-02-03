import { Route } from "react-router-dom";
import { MeProfile } from "../../User/MeProfile";

const UserRoutes = () => {
  return (
    <Route >
      <Route path="/me" element={<MeProfile />} />
    </Route>
  );
};

export { UserRoutes };