import { Route, Navigate } from "react-router-dom";
import ThankYou from "../../TanksYou/ThankYou";
import MiPedido from "../../MiPedido";
import { USER_ROUTES } from "../../../Utils/const/namesRutes";

const HomeRoutes = () => {
  return (
    <>

      <Route path="/" element={<Navigate to={USER_ROUTES.path} replace />} />
      {/* <Route path="/*" element={<TemporaryClosure />} /> */}
      {/* 
			
			
			<Route path="/nosotros" element={<Nosotros />} />
			 */}
      <Route path="/gracias" element={<ThankYou />} />
      <Route path="/mi-pedido" element={<MiPedido />} />
    </>
  );
}

export { HomeRoutes }