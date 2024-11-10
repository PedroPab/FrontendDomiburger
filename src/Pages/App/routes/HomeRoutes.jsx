import { Route } from "react-router-dom";
import FormClient from "../../FormClient";

const HomeRoutes = () => {
  return (
    <Route path="/" element={<FormClient />} />
  );
}

export { HomeRoutes }