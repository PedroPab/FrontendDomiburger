import { Route } from "react-router-dom";
import FormClient from "../../FormClient";
import ThankYou from "../../TanksYou/ThankYou"; // Importar la nueva página de agradecimiento
import MiPedido from "../../MiPedido";

const HomeRoutes = () => {
  return (
    <>

      <Route path="/" element={<FormClient />} />
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